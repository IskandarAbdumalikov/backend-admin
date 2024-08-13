import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Users, validateUser } from "../models/userSchema.js";

const JWT_SECRET = "iskandar";

class UsersController {
  async getProfile(req, res) {
    try {
      let user = await Users.findById(req.user._id);
      res.status(200).json({
        msg: "User registered successfully",
        variant: "success",
        payload: user,
      });
    } catch {
      res.status(500).json({
        msg: err.message,
        variant: "error",
        payload: null,
      });
    }
  }

  async updateProfile(req, res) {
    try {
      const { username } = req.user;
      const { id } = req.params;

      const trimmedId = id.trim();

      const existingUser = await Users.findOne({ username });
      if (existingUser && existingUser._id.toString() !== trimmedId) {
        return res.status(400).json({
          msg: "This username already exists",
          variant: "error",
          payload: null,
        });
      }

      let user = await Users.findById(trimmedId);
      if (!user) {
        return res.status(404).json({
          msg: "User not found",
          variant: "error",
          payload: null,
        });
      }

      req.body.password = user.password;

      user = await Users.findByIdAndUpdate(trimmedId, req.body, { new: true });

      res.status(200).json({
        msg: "Profile updated successfully",
        variant: "success",
        payload: user,
      });
    } catch {
      res.status(500).json({
        msg: "Server error",
        variant: "error",
        payload: null,
      });
    }
  }

  async getUserSearch(req, res) {
    try {
      let { value = "", limit = 3 } = req.query;
      let text = value.trim();
      if (!text) {
        return res.status(400).json({
          msg: "write something",
          variant: "error",
          payload: null,
        });
      }
      const users = await Users.find({
        $or: [
          { fname: { $regex: text, $options: "i" } },
          { username: { $regex: text, $options: "i" } },
        ],
      }).limit(limit);
      if (!users.length) {
        return res.status(400).json({
          msg: "user not found",
          variant: "error",
          payload: null,
        });
      }
      res.status(200).json({
        msg: "user found",
        variant: "success",
        payload: users,
      });
    } catch {
      res.status(500).json({
        msg: "server error",
        variant: "error",
        payload: null,
      });
    }
  }
  async resetPassword(req, res) {
    try {
      const { password, newPassword } = req.body;
      const id = req.user._id;

      const user = await Users.findById(id);
      if (!user) {
        return res.status(400).json({
          msg: "User not found",
          variant: "error",
          payload: null,
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          msg: "Old password is incorrect",
          variant: "error",
          payload: null,
        });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();

      res.status(200).json({
        msg: "Password reset successfully",
        variant: "success",
        payload: null,
      });
    } catch {
      res.status(500).json({
        msg: "Something went wrong",
        variant: "error",
        payload: null,
      });
    }
  }

  async registerUser(req, res) {
    try {
      const { error } = validateUser(req.body);
      if (error)
        return res.status(400).json({
          msg: error.details[0].message,
          variant: "error",
          payload: null,
        });

      const { username, password } = req.body;

      const existingUser = await Users.findOne({ username });

      if (existingUser)
        return res.status(400).json({
          msg: "User already exists.",
          variant: "error",
          payload: null,
        });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await Users.create({
        ...req.body,
        password: hashedPassword,
      });

      res.status(201).json({
        msg: "User registered successfully",
        variant: "success",
        payload: user,
      });
    } catch (err) {
      res.status(500).json({
        msg: err.message,
        variant: "error",
        payload: null,
      });
    }
  }
  async loginUser(req, res) {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });
    if (!user)
      return res.status(400).json({
        msg: "Invalid username or password.",
        variant: "error",
        payload: null,
      });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({
        msg: "Invalid username or password.",
        variant: "error",
        payload: null,
      });

    const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      msg: "Logged in successfully",
      variant: "success",
      payload: { token, user },
    });
  }
  async getAllUsers(req, res) {
    try {
      // let { value = "", limit = 3 } = req.query;
      // let text = value.trim();
      // if (!text) {
      //   return res.status(400).json({
      //     msg: "write something",
      //     variant: "error",
      //     payload: null,
      //   });
      // }
      const users = (await Users.find().sort({ createdAt: -1 })).filter(
        (el) => el.role !== "owner"
      );
      res.status(200).json({
        msg: "Users fetched successfully",
        variant: "success",
        payload: users,
      });
    } catch (err) {
      res.status(500).json({
        msg: "Server error",
        variant: "error",
        payload: null,
      });
    }
  }
  async updateUser(req, res) {
    try {
      const { id } = req.params;

      const existingUser = await Users.findOne({ username: req.body.username });
      if (existingUser && id !== existingUser._id?.toString())
        return res.status(400).json({
          msg: "User already exists.",
          variant: "error",
          payload: null,
        });

      req.body.password = existingUser.password; 

      let user = await Users.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({
        msg: "user updated",
        variant: "success",
        payload: user,
      });
    } catch (err) {
      res.status(500).json({
        msg: err.message,
        variant: "error",
        payload: null,
      });
    }
  }
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await Users.findByIdAndDelete(id);
      res.status(200).json({
        msg: "user deleted",
        variant: "success",
        payload: user,
      });
    } catch (err) {
      res.status(500).json({
        msg: "Server error",
        variant: "error",
        payload: null,
      });
    }
  }
}

export default new UsersController();

import { Blogs, validateBlog } from "../models/blogSchema.js";

class BlogsController {
  async get(req, res) {
    try {
      const blogs = await Blogs.find()
        .populate([{ path: "userId", select: ["fname", "username"] }])
        .sort({ createdAt: -1 });
      if (!blogs.length) {
        return res.status(400).json({
          msg: "Blog is not defined",
          variant: "error",
          payload: null,
        });
      }
      res.status(200).json({
        msg: "All Blogs",
        variant: "success",
        payload: blogs,
      });
    } catch {
      res.status(500).json({
        msg: "Server error",
        variant: "error",
        payload: null,
      });
    }
  }

  async create(req, res) {
    try {
      const { error } = validateBlog(req.body);
      if (error) {
        return res.status(400).json({
          msg: error.details[0].message,
          variant: "warning",
          payload: null,
        });
      }
      const blog = await Blogs.create({ ...req.body, userId: req.user._id });
      res.status(201).json({
        msg: "Blog is created",
        variant: "success",
        payload: blog,
      });
    } catch {
      res.status(500).json({
        msg: "Server error",
        variant: "error",
        payload: null,
      });
    }
  }

  async update(req, res) {
    try {
      const { error } = validateBlog(req.body);
      if (error) {
        return res.status(400).json({
          msg: error.details[0].message,
          variant: "warning",
          payload: null,
        });
      }
      const blog = await Blogs.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!blog) {
        return res.status(400).json({
          msg: "Blog not found",
          variant: "error",
          payload: null,
        });
      }
      res.status(200).json({
        msg: "Blog is updated",
        variant: "success",
        payload: blog,
      });
    } catch {
      res.status(500).json({
        msg: "Server error",
        variant: "error",
        payload: null,
      });
    }
  }

  async delete(req, res) {
    try {
      const blog = await Blogs.findByIdAndDelete(req.params.id);
      if (!blog) {
        return res.status(404).json({
          msg: "Blog not found",
          variant: "error",
          payload: null,
        });
      }
      res.status(200).json({
        msg: "Blog is deleted",
        variant: "success",
        payload: blog,
      });
    } catch {
      res.status(500).json({
        msg: "Server error",
        variant: "error",
        payload: null,
      });
    }
  }
}

export default new BlogsController();

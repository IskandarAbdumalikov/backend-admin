import express from "express";
import BlogsController from "../controller/blog.js";
import UsersController from "../controller/user.js";
import ProductController from "../controller/product.js";
import { auth } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin-middleware.js";
import { ownerMiddleware } from "../middleware/owner-middleware.js";
import { uploader } from "../middleware/uploader.js";

const router = express.Router();

// Blogs
router.get("/api/blogs", [auth, adminMiddleware], BlogsController.get);
router.post("/api/blogs", [auth, ownerMiddleware], BlogsController.create);
router.put("/api/blogs/:id", [auth, ownerMiddleware], BlogsController.update);
router.delete( "/api/blogs/:id", [auth, ownerMiddleware], BlogsController.delete);

// Users
router.get("/api/profile", [auth], UsersController.getProfile);
router.patch("/api/profile/:id", [auth], UsersController.updateProfile);
router.get("/api/users", UsersController.getAllUsers);
router.get("/api/users/search", UsersController.getUserSearch);
router.post("/api/users/sign-up", UsersController.registerUser);
router.post("/api/users/sign-in", UsersController.loginUser);
router.patch("/api/users/:id", UsersController.updateUser);
router.delete("/api/users/:id", UsersController.deleteUser);
router.patch("/api/password", [auth], UsersController.resetPassword);

// Products
router.post("/api/products",[auth, ownerMiddleware, uploader.array("files")],ProductController.createProduct);
router.get("/api/products", ProductController.getProducts);
router.delete("/api/products/:id",[auth, ownerMiddleware],ProductController.deleteProduct);
router.get("/api/products/:id", ProductController.getProductById);
router.patch( "/api/products/:id", [auth, ownerMiddleware], ProductController.updateProduct);
router.get("/api/products/search", ProductController.getProductsBySearch);




export default router;

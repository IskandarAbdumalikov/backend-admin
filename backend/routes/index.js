import express from "express"
import BlogsController from "../controller/blog.js";
import UsersController from "../controller/user.js"
import { auth } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin-middleware.js";
import { ownerMiddleware } from "../middleware/owner-middleware.js";
const router = express.Router()

router.get("/api/blogs", [auth, adminMiddleware], BlogsController.get)
router.post("/api/blogs", [auth, ownerMiddleware], BlogsController.create)
router.put("/api/blogs/:id", [auth, ownerMiddleware], BlogsController.update);
router.delete("/api/blogs/:id", [auth, ownerMiddleware], BlogsController.delete);

router.get('/api/profile', [auth], UsersController.getProfile)
router.get('/api/users', UsersController.getAllUsers)
router.get('/api/users/search', UsersController.getUserSearch)
router.post('/api/users/sign-up', UsersController.registerUser)
router.post('/api/users/sign-in', UsersController.loginUser)
router.patch('/api/users/:id', UsersController.updateUser)

export default router


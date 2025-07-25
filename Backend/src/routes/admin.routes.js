import express from "express";
import { adminLogin, approveCommentById, deleteCommenById, getAllBlogs, getAllComments, getDashboard } from "../controllers/admin.controller.js";
import authValidation from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/blogs", authValidation, getAllBlogs);
router.get("/comments", authValidation, getAllComments);
router.post("/delete-comment", authValidation, deleteCommenById);
router.post("/approve-comment", authValidation, approveCommentById)
router.get("/dashboard", authValidation, getDashboard);

export default router;

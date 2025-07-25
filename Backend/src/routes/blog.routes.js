import express from "express";
import { addBlog, deleteBlogById, generateContentWithAI, getAllBlogs, getBlogById, toggleIsPublished } from "../controllers/blog.controller.js";
import upload from "../middlewares/multer.middleware.js";
import authValidation from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add-blog", authValidation, upload.single("imageFile"), addBlog);
router.get("/", getAllBlogs);
router.get("/:blogId", getBlogById);
router.post("/delete", authValidation, deleteBlogById);
router.post("/toggle-publish", authValidation, toggleIsPublished);

// AI API
router.post("/generate", authValidation, generateContentWithAI);

export default router;

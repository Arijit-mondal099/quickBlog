import express from "express"
import { addComment, getBlogComments } from "../controllers/comment.controller.js";

const router = express.Router()

router.post("/add-comment", addComment);
router.post("/", getBlogComments);

export default router;

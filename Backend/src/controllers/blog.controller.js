import fs from "fs";
import imagekit from "../configs/imagekit.config.js";
import Blog from "../models/Blog.model.js";
import Comment from "../models/Comment.model.js";
import main from "../configs/gemini.config.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, discription, category, isPublished } = JSON.parse(
      req.body?.blog
    );
    const imageFile = req.file;

    if (!title || !discription || !category || !isPublished || !imageFile) {
      return res.status(400).json({
        success: false,
        message: "Plase provide all fildes",
      });
    }

    // upload image file to imagekit
    const fileBuffer = fs.readFileSync(imageFile.path);

    const imagekitResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // optimization through imagekit URL transformation
    const optimizedImageUrl = imagekit.url({
      path: imagekitResponse.filePath,
      transformation: [
        { quality: "auto" }, // auto compression
        { format: "webp" }, // convert to modern format
        { width: "1280" }, // width resizing
      ],
    });

    const image = optimizedImageUrl;

    const blog = await Blog.create({
      title,
      subTitle,
      discription,
      isPublished,
      category,
      image,
    });

    return res.status(201).json({
      success: true,
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "Can't find blog! plase try again." || error.message,
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;

    await Blog.findByIdAndDelete(id);
    await Comment.deleteMany({ blogId: id });

    return res.status(200).json({
      success: true,
      message: "blog deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleIsPublished = async (req, res) => {
  try {
    const { id } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    return res.status(200).json({
      success: true,
      message: "isPublished toggled successfully.",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const generateContentWithAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    const content = await main(
      prompt + " Generate a blog content for this topic in simple text format."
    );

    return res.status(201).json({
      success: true,
      content,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

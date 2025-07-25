import Comment from "../models/Comment.model.js";

export const addComment = async (req, res) => {
  try {
    const { blogId, name, content } = req.body;

    if (!blogId || !name || !content) {
      return res.status(404).json({
        success: false,
        message: "All fildes are required!",
      });
    }

    const comment = await Comment.create({ blogId, name, content });

    return res.status(200).json({
      success: true,
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;

    const comments = await Comment.find({ blogId, isApproved: true }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

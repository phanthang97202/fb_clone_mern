import Post from '../models/Post.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';

export const createComment = async (req, res, next) => {
  try {
    const data = await Comment.create(req.body);
    res.status(201).json({
      status: 'success',
      data: data,
    });
  } catch (err) {
    res.status(201).json({
      status: 'fail',
      message: err.message,
    });
  }
};
export const getAllComments = async (req, res, next) => {
  try {
    const data = await Comment.find();
    res.status(201).json({
      status: 'success',
      data: data,
    });
  } catch (err) {
    res.status(201).json({
      status: 'fail',
      message: err.message,
    });
  }
};
export const getCommentOnPost = async (req, res, next) => {
  try {
    const { idPost } = req.params;
    console.log('===idPost', idPost);
    const data = await Comment.find({ post: idPost }).populate('user');
    res.status(201).json({
      status: 'success',
      result: data.length,
      data: data,
    });
  } catch (err) {
    res.status(201).json({
      status: 'fail',
      message: err.message,
    });
  }
};

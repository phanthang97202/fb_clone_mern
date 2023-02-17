import express from 'express';
import {
  createComment,
  getAllComments,
  getCommentOnPost,
} from '../controllers/comment.js';
import { verifyToken } from '../middleware/auth.js';

const commentsRouter = express.Router();

commentsRouter.post('/', verifyToken, createComment);
commentsRouter.get('/', verifyToken, getAllComments);
commentsRouter.get('/:idPost', verifyToken, getCommentOnPost);

export default commentsRouter;

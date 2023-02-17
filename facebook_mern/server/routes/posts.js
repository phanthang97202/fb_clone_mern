import express from 'express';
import { verify } from 'jsonwebtoken';
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  deletePost,
  deleteOwnerPost,
  // searchPosts,
  // commentsPost,
  updatePost,
  getPost,
} from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const postsRouter = express.Router();

/* READ */
postsRouter.get('/', verifyToken, getFeedPosts);
postsRouter.get('/:userId/posts', verifyToken, getUserPosts);
postsRouter.get('/:idPost', verifyToken, getPost);

/* LIKE POST */
postsRouter.patch('/:idPost/like', verifyToken, likePost);
// postsRouter.patch('/:idPost/updatePost/:idUser', verifyToken, updatePost);

// DELETE
postsRouter.delete('/:idPost', verifyToken, deletePost);
postsRouter.delete('/:idPost/deletePost/:idUser', verifyToken, deleteOwnerPost);

// COMMENT
// postsRouter.post('/:id', verify, commentsPost);
export default postsRouter;

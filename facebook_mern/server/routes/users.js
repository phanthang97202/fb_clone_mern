import express from 'express';
import {
  getUser,
  getUserFriends,
  addRomoveFriend,
  getAllUser,
} from '../controllers/users.js';

import { verifyToken } from '../middleware/auth.js';

const userRouter = express.Router();

// get all user
userRouter.get('/', verifyToken, getAllUser);
// READ
userRouter.get('/:id', verifyToken, getUser);
userRouter.get('/:id/friends', verifyToken, getUserFriends);

// UPDATE
userRouter.patch('/:id/:fiendId', verifyToken, addRomoveFriend);

export default userRouter;

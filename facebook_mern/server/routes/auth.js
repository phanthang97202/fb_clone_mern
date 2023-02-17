import express from 'express';
import { login } from './../controllers/auth.js';
const authRouter = express.Router();
authRouter.route('/').post(login);

export default authRouter;

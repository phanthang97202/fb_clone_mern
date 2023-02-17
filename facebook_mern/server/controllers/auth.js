import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/auth.js';
import User from './../models/User.js';

// REGISTER USER
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt();
    // console.log('\n===salt auth register controller===\n', salt);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json({
      status: 'success',
      data: savedUser,
    });
  } catch (e) {
    res.status(500).json({
      status: 'error',
      message: e.message,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // hanlder
    const user = await User.findOne({ email: email }).select('+password');
    // const user = await User.findOne({ email: email });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log('\n===token auth login controller===\n', token);

    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(500).json({
        status: 'fail',
        message: 'Sai mật khẩu hoặc email',
      });
    }
    if (user || (await user.correctPassword(password, user.password))) {
      res.status(201).json({
        status: 'success',
        data: { token, user },
      });
    }
    // return next();

    // verifyToken();
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

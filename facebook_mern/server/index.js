import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { register } from './controllers/auth.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import { verifyToken } from './middleware/auth.js';
import { createPost, updatePost } from './controllers/posts.js';

// CONFIGUARATIONS
const __filename = fileURLToPath(import.meta.url); // lấy các file có từ module
const __dirname = path.dirname(__filename);
dotenv.config({ path: './config.env' });

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));

// lấy ra thông tin post mà người dùng post lên, ví dụ như username, password
app.use(bodyParser.json({ limit: '30mb', extended: true }));

// cho phép nhiều tài nguyên khác nhau của trang web có thể được truy vấn từ domain khác với domain của trang đó
// một kiểu chính sách bảo mật web
app.use(cors());

// thiết lập thư mục của mình lưu trữ
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// FILE STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets');
  },
  filename: (req, file, cb) => {
    // cb(null, file.fieldname);
    console.log('===file', file);
    console.log('===req.file', req.file);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// ROUTERS WITH FILES
//single là field picture trong document
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('userPicturePath'), createPost);
app.patch(
  '/posts/:idPost/updatePost/:idUser',
  verifyToken,
  upload.single('userPicturePath'),
  updatePost
);
// ROUTERS
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// MONGOOSE SETUP
const DB = process.env.MONGO_URL.replace(
  '<password>',
  process.env.MONGO_PASSWORD
);
const PORT = process.env.PORT || 6001;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n🎉🎉🎉SUCCESS TO CONNECT SERVER ON PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(
      `\n💣💣💣FAIL TO CONNECT SERVER ON PORT: ${PORT} \n Error: ${error} `
    );
  });

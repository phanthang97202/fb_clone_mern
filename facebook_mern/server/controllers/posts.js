import Post from '../models/Post.js';
import User from '../models/User.js';

// reate

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, userPicturePath } = req.body;
    const user = await User.findById(userId);
    console.log('==REQ.FILE==', req.file);
    console.log('==REQ.BODY==', req.body);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: req.file ? req.file.originalname : '',
      picturePath: user.picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json({
      status: 'success',
      data: post,
    });
  } catch (err) {
    res.status(409).json({ status: 'fail', message: err.message });
  }
};

// COMMENT POST
// export const commentsPost = async (req, res) => {
//   try {
//     const { _id } = req.params;
//     const comment = await Post.findByIdAndUpdate(_id, {
//       comments: 'fdsfd',
//     }).sort({ createdAt: -1 });
//
//     res.status(200).json({
//       status: 'success',
//       data: comment,
//     });
//   } catch (err) {
//     res.status(404).json({ status: 'fail', message: err.message });
//   }
// };

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const filterQuery = { ...req.query };

    const post = await Post.find({
      description: new RegExp(filterQuery.description, 'i'),
      firstName: new RegExp(filterQuery.firstName, 'i'),
      lastName: new RegExp(filterQuery.lastName, 'i'),
    }).sort({ createdAt: -1 });

    console.log('filter query', filterQuery);

    res.status(200).json({
      status: 'success',
      results: post.length,
      data: post,
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      data: post,
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { idPost } = req.params;
    const post = await Post.findByIdAndDelete({ _id: idPost });
    res.status(204).json({ status: 'success' });
  } catch (err) {
    res.status(404).json({ status: 'fail' });
  }
};

/* UPDATE */

export const updatePost = async (req, res, next) => {
  try {
    const { idPost: id, idUser: userId } = req.params;
    // console.log('===id, idUser', id, userId, typeof id);
    // console.log('===req', req.user);
    const postOnUser = await Post.find({ userId })
      .sort({ createdAt: -1 })
      .select('+ _id');
    // console.log('====postOnUser', postOnUser);

    const checkUserOwnedPost = postOnUser.some((item, index) => {
      return `${item['_id']}` === `${id}`;
    });
    if (checkUserOwnedPost) {
      // const { description } = req.body;
      const update = await Post.findByIdAndUpdate(
        id,
        {
          description: req.body.description,
          userPicturePath: req.file.originalname,
        },
        {
          new: true,
        }
      );
      console.log(req.body);

      // cách 2 với new Post
      //       const { description } = req.body;
      //       const post = await Post.findById(id);
      //       // console.log('======POST========', post);
      //       console.log('======req.file update========', req.file);
      //       post.description = description;
      //       // post.userPicturePath = req.file.originalname;
      //       await post.save();
      res.status(200).json({
        status: 'success',
        data: update,
        // data: post,
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy id bài viết này! Kiểm tra lại!',
      });
    }
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err.message });
  }
};

// export const likePost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { userId } = req.body;
//     const post = await Post.findById(id);
//     // dạng Map Boolean nên chúng nó có thể dùng get và set trong
//     // property của field
//     const isLiked = post.likes.get(userId);
//
//     if (isLiked) {
//       post.likes.delete(userId);
//     } else {
//       post.likes.set(userId, true);
//     }
//
//     const updatedPost = await Post.findByIdAndUpdate(
//       id,
//       { likes: post.likes },
//       { new: true }
//     );
//
//     res.status(200).json({ status: 'success', data: updatedPost });
//   } catch (err) {
//     res.status(404).json({ status: 'fail', message: err.message });
//   }
// };
export const likePost = async (req, res) => {
  try {
    const { idPost: id } = req.params;
    console.log('===id', id, typeof id);
    const { userId } = req.body;
    console.log('==userId', userId);
    const post = await Post.findById(id);
    console.log('===post.likes===', post.likes);
    post.likes.set(userId, true);
    await post.save();
    const numberOfLikes = post.likes.size;
    console.log('===numberOfLikes', numberOfLikes);
    res.status(200).json({ status: 'success', data: post });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err.message });
  }
};

// GET POST
export const getPost = async (req, res) => {
  try {
    const { idPost } = req.params;
    const post = await Post.findById({ _id: idPost });
    res.status(200).json({ status: 'success', data: post });
  } catch (err) {
    res.status(404).json({ status: 'fail' });
  }
};
// SEARCH POSTS
// export const searchPosts = async (req, res) => {
//   try {
//     const { searchName } = req.body;
//     const post = await Post.find({ firstName: userPost, description: descriptionPost });
//     res.status(200).json({ status: 'success', data: post });
//   } catch (err) {
//     res.status(404).json({ status: 'fail', message: err.message });
//   }
// };

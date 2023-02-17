import User from './../models/User.js';
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send({
      status: 'success',
      data: users,
    });
  } catch (e) {
    res.status(404).send({
      status: 'fail',
    });
  }
};
export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findById({ _id: id });
    res.status(200).send({
      status: 'success',
      data: user,
    });
  } catch (err) {
    res.status(404).send({
      status: 'fail',
      message: err.message,
    });
  }
};
export const getUserFriends = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );
    res.status(200).json({
      status: 'success',
      data: formattedFriends,
    });
  } catch (err) {
    res.status(404).send({
      status: 'fail',
      message: err.message,
    });
  }
};
export const addRomoveFriend = async (req, res, next) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json({
      status: 'success',
      data: formattedFriends,
    });
  } catch (err) {
    res.status(404).send({
      status: 'fail',
      message: err.message,
    });
  }
};

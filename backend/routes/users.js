const userRouter = require('express').Router();

const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');

const {
  updateUserJoi,
  updateUserAvatarJoi,
  getUserJoi,
} = require('../middlewares/joi');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserInfo);
userRouter.get('/:userId', getUserJoi, getUser);
userRouter.patch('/me', updateUserJoi, updateUser);
userRouter.patch('/me/avatar', updateUserAvatarJoi, updateUserAvatar);

module.exports = userRouter;

const { celebrate, Joi } = require('celebrate');
const RegExp = require('../utils/constants');

const getUserJoi = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().required().alphanum()
      .length(24),
  }),
});

const createUserJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(
      RegExp,
    ),
  }),
});

const loginJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const updateUserJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateUserAvatarJoi = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(
      RegExp,
    ),
  }),
});

const createCardJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(
      RegExp,
    ),
  }),
});

const validateCardJoi = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  createUserJoi,
  loginJoi,
  updateUserJoi,
  updateUserAvatarJoi,
  createCardJoi,
  getUserJoi,
  validateCardJoi,
};

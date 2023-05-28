const router = require('express').Router();
const { errors } = require('celebrate');
const NotFoundError = require('../errors/notFoundError');
const userRouter = require('./users');
const cardRouter = require('./cards');

const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { createUserJoi, loginJoi } = require('../middlewares/joi');

router.post('/signup', createUserJoi, createUser);
router.post('/signin', loginJoi, login);

// авторизация
router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/*', (req, res, next) => next(new NotFoundError('Wrong way!')));

router.use(errors({ message: 'Validation error!' }));
module.exports = router;

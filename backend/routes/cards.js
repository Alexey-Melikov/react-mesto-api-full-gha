const cardRouter = require('express').Router();
const { createCardJoi, validateCardJoi } = require('../middlewares/joi');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', createCardJoi, createCard);
cardRouter.delete('/:cardId', validateCardJoi, deleteCard);
cardRouter.put('/:cardId/likes', validateCardJoi, likeCard);
cardRouter.delete('/:cardId/likes', validateCardJoi, dislikeCard);

module.exports = cardRouter;

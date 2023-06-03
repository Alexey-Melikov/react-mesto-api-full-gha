const mongoose = require('mongoose');

const NotFoundError = require('../errors/notFoundError');
const IncorrectError = require('../errors/incorrectError');
const ForbiddenError = require('../errors/forbiddenError');

const cardSchema = require('../models/card');

module.exports.getCards = (req, res, next) => {
  cardSchema
    .find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  cardSchema
    .create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new IncorrectError('Incorrect data was passed during card creation.'));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const currentUser = req.user._id;
  const { cardId } = req.params;
  cardSchema
    .findById(cardId)
    .orFail(new NotFoundError('Incorrect data was sent when deleting the card.'))
    .then((card) => {
      if (currentUser !== card.owner.toString()) {
        return next(new ForbiddenError('No rights to delete card.'));
      }
      return card;
    })
    .then((card) => cardSchema.deleteOne(card))
    .then(() => res.status(200).send({ message: 'card deletion was successful' }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new IncorrectError('Incorrect data was sent to set/unlike.'));
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('A non-existent id of the card was passed.'));
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new IncorrectError('Incorrect data was sent to set/unlike.'));
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('A non-existent id of the card was passed.'));
      }
      return next(err);
    });
};

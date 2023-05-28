import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, handleCardDelete }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    handleCardDelete(card);
  }
  //Using context =>
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки =>
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `places__heart ${
    isLiked && "places__heart_active"
  }`;

  return (
    <div className="places__place">
      {isOwn && (
        <button
          onClick={handleDeleteClick}
          aria-label="Кнопка удалить карточку"
          className="places__delete-icon button-hover"
          type="button"
        ></button>
      )}
      <img
        className="places__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="places__group">
        <h2 className="places__depiction">{card.name}</h2>
        <div className="places__like-container">
          <button
            onClick={handleLikeClick}
            aria-label="Кнопка поставить лайк"
            type="button"
            className={cardLikeButtonClassName}
          ></button>
          <span className="places__like-calculator">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export { Card };

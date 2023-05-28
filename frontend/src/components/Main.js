import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Card } from "./Card.js";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  cards,
  handleCardDelete,
}) {
  //Using context =>
  const currentUser = React.useContext(CurrentUserContext);


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-containrer">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="фотография Жак-Ив Кусто"
          />
          <button
            className="profile__avatar-button"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            aria-label="Кнопка открытия профиля"
            type="button"
            className="profile__edit-button button-hover"
            onClick={onEditProfile}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          aria-label="Кнопка открытия добавления фото с описанием"
          type="button"
          className="profile__add-button button-hover"
          onClick={onAddPlace}
        ></button>
      </section>
      <ul className="places">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardLike={onCardLike}
            onCardClick={onCardClick}
            handleCardDelete={handleCardDelete}
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;

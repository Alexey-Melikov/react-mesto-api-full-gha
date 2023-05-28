import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

//image =>
import successImage from "../images/logo/successful-logo.svg";
import unSuccessImage from "../images/logo/not-successful-logo.svg";
//Api =>
import { api } from "../utils/Api.js";
import * as auth from "../utils/auth";
// Components =>
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute.js";
// Context =>
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  //Стейт =>
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [headerEmail, setHeaderEmail] = useState("");
  const [tooltipStatus, setTooltipStatus] = useState({
    text: "",
    image: "",
  });

  const navigate = useNavigate();

  //Token check =>
  useEffect(() => {
    const jwt = localStorage.getItem("JWT");
    if (!jwt) {
      return;
    }
    auth
      .getContent(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setHeaderEmail(res.data.email);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInformation(), api.getInitialCards()])
        .then(([userData, cards]) => {
          // Данные профиля =>
          setCurrentUser(userData);
          // Запрос карточки =>
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  //Клик на карточку =>
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  //Попап профиля =>
  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(true);
  }
  //Попап карточки =>
  function handleAddPlacePopupOpen() {
    setIsAddPlacePopupOpen(true);
  }
  //Попап аватар =>
  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(true);
  }
  //Tooltip popup
  function handleTooltipPopupOpen() {
    setIsTooltipPopupOpen(true);
  }
  //Закрыть попапы =>
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsTooltipPopupOpen(false);
    setSelectedCard(null);
  }
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  //Delete Card =>
  function handleCardDelete(card) {
    api
      .handleDeleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  // update CurrenUser info =>
  function handleUpdateUser({ name, about }) {
    api
      .updateUserInformation({ name, about })
      .then((profileParams) => {
        setCurrentUser(profileParams);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ url }) {
    api
      .userAvatarUpdate({ url })
      .then((avatarParams) => {
        setCurrentUser(avatarParams);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .handleAddCard({ name, link })
      .then((cardParams) => {
        setCards([cardParams, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // Registration =>
  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          handleTooltipPopupOpen();
          navigate("/sign-in");
          setTooltipStatus({
            text: "Вы успешно зарегистрировались!",
            image: successImage,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setTooltipStatus({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          image: unSuccessImage,
        });
      })
      .finally(() => {
        handleTooltipPopupOpen();
      });
  }

  // authorization
  function handleAuthorize(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setHeaderEmail(email);
          localStorage.setItem("JWT", res.token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setTooltipStatus({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          image: unSuccessImage,
        });
        handleTooltipPopupOpen();
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("JWT");
    navigate("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header headerEmail={headerEmail} handleSignOut={handleSignOut} />
          <Routes>
            <Route
              path="/sign-in"
              element={<Login handleAuthorize={handleAuthorize} />}
            ></Route>
            <Route
              path="/sign-up"
              element={<Register handleRegister={handleRegister} />}
            ></Route>

            <Route
              path="*"
              element={
                <ProtectedRoute
                  path="/"
                  loggedIn={loggedIn}
                  element={Main}
                  onCardLike={handleCardLike}
                  onEditProfile={handleEditProfilePopupOpen}
                  onAddPlace={handleAddPlacePopupOpen}
                  onEditAvatar={handleEditAvatarPopupOpen}
                  onCardClick={handleCardClick}
                  cards={cards}
                  handleCardDelete={handleCardDelete}
                ></ProtectedRoute>
              }
            ></Route>
          </Routes>
          <Footer />

          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isTooltipPopupOpen}
            tooltipStatus={tooltipStatus}
          />

          {/* "Попап картинки карточки" =>*/}
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          {/* "Редактировать профиль" =>*/}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          {/* "Редактировать карточки" =>*/}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateCard={handleAddPlaceSubmit}
          />

          {/* "Удалить карточки" =>*/}
          <PopupWithForm
            title="Вы уверены?"
            name="delete-card"
            buttonText="Да"
          />

          {/* "Обновить аватар" =>*/}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

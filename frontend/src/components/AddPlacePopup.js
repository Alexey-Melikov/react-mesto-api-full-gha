import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onUpdateCard }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChange(e) {
    e.target.name == "name" ? setName(e.target.value) : setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateCard({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="cards-setting"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <label className="popup__label">
          <input
            value={name || ""}
            minLength="2"
            maxLength="30"
            required
            className="popup__input popup__input_title"
            placeholder="название"
            type="text"
            name="name"
            id="nameInput"
            onChange={handleChange}
          />
          <span className="nameInput-error popup__input-error"></span>
        </label>
        <label className="popup__label">
          <input
            value={link || ""}
            required
            className="popup__input popup__input_url"
            placeholder="Ссылка на картинку"
            type="url"
            name="link"
            id="urlImput"
            onChange={handleChange}
          />
          <span className="urlImput-error popup__input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
export default AddPlacePopup;

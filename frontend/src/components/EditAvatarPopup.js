import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ url: inputRef.current.value });
  }
  return (
    <PopupWithForm
      title="Обновить аватар?"
      name="update-avatar"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <label className="popup__label">
          <input
            ref={inputRef}
            required
            className="popup__input popup__input_avatar"
            placeholder="Ссылка на аватар"
            type="url"
            name="avatarImput"
            id="avatarImput"
          />
          <span className="avatarImput-error popup__input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;


function PopupWithForm({ isOpen, name, onClose, title, buttonText, children, onSubmit }) {
  const className = `popup ${isOpen ? "popup_opened" : ""}`;
  return (
    <section className={className} id={`popup__${name}`}>
      <div className="popup__container">
        <button
          aria-label="Кнопка закрытия"
          id={`${name}_close-button`}
          type="button"
          className="popup__close-button button-hover"
          onClick={onClose}
        ></button>
        <h2 className="popup__profile-setup">{title}</h2>
        <form
          noValidate
          name={`${name}-form`}
          id={`${name}__form`}
          className="popup__form"
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className="popup__save-button popup__button button-hover"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;

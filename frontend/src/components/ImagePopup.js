function ImagePopup({ card, onClose }) {
  const className = `popup popup-image ${card ? "popup_opened" : " "}`;

  return (
    <section id="popup-image" className={className}>
      <figure className="popup-image__figure">
        <button
          aria-label="Кнопка закрытия окна"
          id="popup-image__close-button"
          type="button"
          className="popup-image__close-button popup__close-button button-hover"
          onClick={onClose}
        ></button>
        <img className="popup-image__image" src={card?.link} alt={card?.name} />
        <figcaption className="popup-image__caption">{card?.name}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;

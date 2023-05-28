import React from "react";

function InfoTooltip({ onClose, isOpen, tooltipStatus }) {
  const className = `popup ${isOpen ? "popup_opened" : ""}`;
  return (
    <section className={className}>
      <div className="popup__container">
        <button
          id="infoTooltip-button"
          aria-label="Кнопка закрытия окна"
          type="button"
          onClick={onClose}
          className="popup-image__close-button popup__close-button button-hover"
        ></button>
        <img src={tooltipStatus.image} className="popup__infoTooltip-image" />
        <h2 className="popup__infoTooltip-title">{tooltipStatus.text}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;

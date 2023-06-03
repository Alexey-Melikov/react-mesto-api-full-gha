import { apiConfig } from "./utils.js";

class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }
  _handleResponseStatus(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Произошла ошибка: ${res.status}`);
  }

  getUserInformation() {
    const token = localStorage.getItem("JWT");
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._handleResponseStatus(res);
    });
  }

  getInitialCards() {
    const token = localStorage.getItem("JWT");
    return fetch(`${this.url}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._handleResponseStatus(res);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    const token = localStorage.getItem("JWT");
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._handleResponseStatus(res);
    });
  }

  handleDeleteCard(cardId) {
    const token = localStorage.getItem("JWT");
    return fetch(`${this.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._handleResponseStatus(res);
    });
  }

  updateUserInformation(userInfo) {
    const token = localStorage.getItem("JWT");
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
    }).then((res) => {
      return this._handleResponseStatus(res);
    });
  }

  userAvatarUpdate(userInfo) {
    const token = localStorage.getItem("JWT");
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: userInfo.url,
      }),
    }).then((res) => {
      return this._handleResponseStatus(res);
    });
  }

  handleAddCard({ name, link }) {
    const token = localStorage.getItem("JWT");
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._handleResponseStatus(res);
    });
  }
}

export const api = new Api(apiConfig);

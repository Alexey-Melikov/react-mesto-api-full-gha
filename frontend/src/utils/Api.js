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
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: {
        authorization: this.headers,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._handleResponseStatus(res);
    });
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      method: "GET",
      headers: {
        authorization: this.headers,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._handleResponseStatus(res);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: {
        authorization: this.headers,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._handleResponseStatus(res);
    });
  }

  handleDeleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.headers,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._handleResponseStatus(res);
    });
  }

  updateUserInformation(userInfo) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.headers,
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
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.headers,
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
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: {
        authorization: this.headers,
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

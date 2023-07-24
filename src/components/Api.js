export default class Api {

    constructor(config) {
      this._baseUrl = config.baseUrl;
      this._headers = config.headers;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getUserInfo() { //Загрузка информации о пользователе с сервера
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers
      })
        .then(this._checkResponse);
    }
  
    updateUserInfo(data) { //Редактирование профиля
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
      })
        .then(this._checkResponse);
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
        .then(this._checkResponse);
    }
  
    addCard(data) { //Добавление новой карточки
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data)
      })
        .then(this._checkResponse);
    }
  
    deleteCard(cardId) { // Удаление карточки
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(this._checkResponse);
    }

    likeCard(cardId) { // Лайки
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
          method: 'PUT',
          headers: this._headers
        })
          .then(this._checkResponse);
      }

      
  }
 
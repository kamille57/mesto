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

  _request(url, options) { 
    return fetch(url, options).then(this._checkResponse); 
  }

  getUserInfo() { //Загрузка информации о пользователе с сервера 
    return this._request(`${this._baseUrl}/users/me`, { 
      method: 'GET', 
      headers: this._headers 
    }); 
  } 

  updateUserInfo(data) { //Редактирование профиля 
    return this._request(`${this._baseUrl}/users/me`, { 
      method: 'PATCH', 
      headers: this._headers, 
      body: JSON.stringify({ 
        name: data.name, 
        about: data.about, 
      }) 
    }); 
  } 

  updateUserAvatar(data) { 
    return this._request(`${this._baseUrl}/users/me/avatar`, { 
      method: 'PATCH', 
      headers: this._headers, 
      body: JSON.stringify({ 
        avatar: data.avatar 
      }) 
    }); 
  } 

  getInitialCards() { 
    return this._request(`${this._baseUrl}/cards`, { 
      headers: this._headers 
    }); 
  } 



  addCard(data) { //Добавление новой карточки 
    return this._request(`${this._baseUrl}/cards`, { 
      method: 'POST', 
      headers: this._headers, 
      body: JSON.stringify(data) 
    }); 
  } 

  deleteCard(cardId) { // Удаление карточки 
    return this._request(`${this._baseUrl}/cards/${cardId}`, { 
      method: 'DELETE', 
      headers: this._headers 
    }); 
  } 

  likeCard(cardId) { // Лайки 
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, { 
      method: 'PUT', 
      headers: this._headers, 
    }); 
  } 

  dislikeCard(cardId) { 
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, { 
      method: 'DELETE', 
      headers: this._headers 
    }); 
  } 

}

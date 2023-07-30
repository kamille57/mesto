export default class Card { 
  constructor(data, cardConfig, handleCardClick, apiObj, currentUserId, openConfirmPopup) { 
    this._name = data.name; 
    this._link = data.link; 
    this._cardId = data._id; 
    this._cardConfig = cardConfig; 
    this._handleCardClick = handleCardClick; 
    this._currentUserId = currentUserId; 
    this._openConfirmPopup = openConfirmPopup 
    this.likeCard = apiObj.like; 
    this.dislikeCard = apiObj.dislike; 
    this.deleteCard = apiObj.delete; 
 
    if (data.owner) { 
      this._ownerId = data.owner._id; 
    } 
 
    if (data.likes) { 
      this._isLikedByOwner = data.likes.some((like) => like._id === this._currentUserId); 
      this._likes = data.likes; 
    } 
  } 
 
  _getTemplate() { 
    const card = document.querySelector(this._cardConfig.cardTemplate).content.querySelector(this._cardConfig.cardElement).cloneNode(true); 
 
    return card; 
  } 
 
  generateCard() { 
    // Генерация карточки и добавление обработчиков событий 
    this._element = this._getTemplate(); 
    this._pic = this._element.querySelector(this._cardConfig.picElement); 
    this._likeButton = this._element.querySelector(this._cardConfig.likeElement); 
    this._trashButton = this._element.querySelector(this._cardConfig.trashElement); 
    this._likeCount = this._element.querySelector(this._cardConfig.likeCountElement); 
    this._setEventListeners(); 
 
    this._pic.src = this._link; 
    this._pic.alt = this._name; 
    this._element.querySelector(this._cardConfig.textElement).textContent = this._name; 
 
    this._hideTrashButton(); 
     
    // Установка активного состояния кнопки лайка, если карточка уже была лайкнута юзером 
    if (this._isLikedByOwner) { 
      this._likeButton.classList.add(this._cardConfig.likeElementActiveClass); 
    } 
 
    // Обновление количества лайков 
    this._updateLikesCount(); 
 
    return this._element; 
  } 
 
  handleLikeButton() { 
    this._likeButton.classList.toggle(this._cardConfig.likeElementActiveClass); 
  } 
 
  _hideTrashButton() { 
    if (this._ownerId !== this._currentUserId) { 
      this._trashButton.classList.add(this._cardConfig.trashElementInvisibleClass); 
      this._trashButton.classList.remove(this._cardConfig.trashElementClass); 
    } 
  } 
 
  removeCard() {   
    this._element.remove();   
  }   
 
  setCardLikes(likes) { 
    this._likes = likes; 
    this._updateLikesCount(); 
    this._isLikedByOwner = this._likes.some((like) => like._id === this._currentUserId); 
  } 
 
  _updateLikesCount() { 
    // Проверка наличия лайков 
    if (this._likes) { 
      this._likeCount.textContent = this._likes.length; 
    } else { 
      this._likeCount.textContent = 0; 
    } 
  } 
 
  _setEventListeners() { 
    this._pic.addEventListener("click", () => { 
      this._handleCardClick(this._link, this._name); 
    }); 
 
    this._likeButton.addEventListener("click", () => { 
      if (this._isLikedByOwner) { 
        this.dislikeCard(this._cardId) 
      } else { 
        this.likeCard(this._cardId); 
      } 
    }); 
 
    this._trashButton.addEventListener("click", () => {  
      this.deleteCard(this._cardId) 
    }); 
  } 
}
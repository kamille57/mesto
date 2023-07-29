export default class Card { 
  constructor(data, cardConfig, handleCardClick, apiObj, currentUserId, handleTrashClick) { 
    console.log(currentUserId);
    this._name = data.name; 
    this._link = data.link; 
    this._cardId = data._id; 
    this._cardConfig = cardConfig; 
    this._handleCardClick = handleCardClick; 
    this._handleTrashClick = handleTrashClick; 
    this._currentUserId = currentUserId; 
    this.likeCard = apiObj.like; 
    this.dislikeCard = apiObj.dislike; 
    this.deleteCard = apiObj.delete; 

    // Проверка наличия владельца карточки
    if (data.owner) { 
      this._ownerId = data.owner._id; 
    }
    
    // Проверка наличия лайков
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
 
    // Установка данных карточки из объекта data
    this._pic.src = this._link; 
    this._pic.alt = this._name; 
    this._element.querySelector(this._cardConfig.textElement).textContent = this._name; 
    
    // Скрытие кнопки удаления, если пользователь не является владельцем карточки
    console.log(this._ownerId);
    console.log(this._currentUserId);
    console.log(this._ownerId !== this._currentUserId);
    if (this._ownerId !== this._currentUserId) { 
      this._hideTrashButton(); 
    } 
 
    // Установка активного состояния кнопки лайка, если карточка уже была лайкнута владельцем
    if (this._isLikedByOwner) { 
      this._likeButton.classList.add(this._cardConfig.likeElementActiveClass); 
    } 
 
    // Обновление количества лайков
    this._updateLikesCount(); 
 
    return this._element; 
  } 
 
  _handleLikeButton() { 
    this._likeButton.classList.toggle(this._cardConfig.likeElementActiveClass); 
  } 
 
  _setCardLikes(likes) {
    console.log(likes); 
    this._likes = likes; 
    this._updateLikesCount(); 
    this._isLikedByOwner = this._likes.some((like) => like._id === this._currentUserId); 
  } 
 
  _updateLikesCount() { 
    console.log(this._likes.slice());
    // Проверка наличия лайков
    if (this._likes) { 
      this._likeCount.textContent = this._likes.length; 
    } else { 
      this._likeCount.textContent = 0; 
    } 
  } 
 
  _hideTrashButton() { 
    this._trashButton.classList.add(this._cardConfig.trashElementInvisibleClass); 
    this._trashButton.classList.remove(this._cardConfig.trashElementClass); 
  } 
 
  _removeCard() { 
    this._element.remove(); 
  } 
 
  _setEventListeners() { 
    this._pic.addEventListener("click", () => { 
      this._handleCardClick(this._link, this._name); 
    }); 
 
    this._likeButton.addEventListener("click", () => { 
      this._handleLikeButton(); 
    }); 
 
    this._trashButton.addEventListener("click", () => { 
      console.log('open confirm popup here');

      this._handleTrashClick(()=> {
        this.deleteCard(this._cardId) 
        .then((res) => { 
          this._removeCard(res._id); 
        }) 
        .catch((error) => { 
          console.error("Произошла ошибка при удалении карточки:", error); 
        }); 
      });

      
    }); 
 
    this._likeButton.addEventListener("click", () => { 
      if (this._isLikedByOwner) { 
        console.log('Dislike this');
        this.dislikeCard(this._cardId).then((res) => { 
          this._setCardLikes(res.likes); 
        }); 
      } else { 
        console.log('Like this');
        this.likeCard(this._cardId).then((res) => this._setCardLikes(res.likes)); 
      } 
    }); 
  } 
}
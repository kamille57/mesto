export default class Card {
  constructor(data, cardConfig, handleCardClick, apiObj) {
    //console.log(data);
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;

    this._cardConfig = cardConfig;
    this._handleCardClick = handleCardClick;
    // this._currentUserId = currentUserId;

    //this._isLikedByOwner = false;
   




    this.likeCard = apiObj.like;
    this.dislikeCard = apiObj.dislike;

    if (data.owner) {
      this._ownerId = data.owner._id;
    }
    if (data.likes) {
      this._isLikedByOwner = data.likes.some(like => like._id === '343397ca12432f3778159dfd');
      this._likes = data.likes;
    }

  }

  getCardId() {
    return this._cardId;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._cardConfig.cardTemplate)
      .content
      .querySelector(this._cardConfig.cardElement)
      .cloneNode(true);

    return card;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._pic = this._element.querySelector(this._cardConfig.picElement);
    this._likeButton = this._element.querySelector(this._cardConfig.likeElement);
    this._trashButton = this._element.querySelector(this._cardConfig.trashElement);
    this._likeCount = this._element.querySelector(this._cardConfig.likeCountElement); // новая строка
    this._setEventListeners();

    this._pic.src = this._link;
    this._pic.alt = this._name;
    this._element.querySelector(this._cardConfig.textElement).textContent = this._name;
    if (this._isLikedByOwner) {
      console.log(this._likeButton);
      //this._likeButton.classList.add('element__like-button_active');
      this._likeButton.classList.add('element__like_active');
    }

    this._updateLikesCount(); // новая строка

    return this._element;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle(this._cardConfig.likeElementActiveClass);
  }

  setCardLikes(likes) {
    console.log(likes);
    this._likes = likes;
    this._updateLikesCount();
  }

  _updateLikesCount() {
    console.log(this._likes);
    if (this._likes) {
      console.log('YES!');
      this._likeCount.textContent = this._likes.length;
    } else {
      this._likeCount.textContent = 0;
    }
  }



  _handleTrashButton() {
    if (this._ownerId === '343397ca12432f3778159dfd') {
      this.removeCard();
      // this._handleDeleteClick(this._cardId);
    }
  }

  removeCard() {
    console.log('remove card!!');
    this._element.remove();
    //this._element = null;
  }

  _setEventListeners() {
    this._pic.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._trashButton.addEventListener('click', () => {
      // вызываем метод делит
      // ждём ответ
      // если ответ - успех, то удаляем карточку через this._handleTrashButton();
      this._handleTrashButton();
    });

    this._likeButton.addEventListener('click', () => {
      if (this._isLikedByOwner) {
        console.log('dislike');
        this.dislikeCard(this._cardId).then(res => {
          console.log(res.likes);
          this.setCardLikes(res.likes)
        });

      } else {
        console.log('like');
        this.likeCard(this._cardId).then(res => this.setCardLikes(res.likes));
      }
    });

  }
};
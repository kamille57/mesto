export default class Card {
  constructor(data, cardConfig, handleCardClick, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._cardConfig = cardConfig;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick.bind(this);
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
    this._updateLikesCount(); // новая строка

    return this._element;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle(this._cardConfig.likeElementActiveClass);
  }

  setCardLikes(likes) {
    this._likes = likes;
    this._updateLikesCount();
  }

  _updateLikesCount() {
    this._likeCount.textContent = this._likes.length;
  }
  
  _handleTrashButton() {
    this._handleDeleteClick(this._cardId);
    this.removeCard();
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._pic.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._trashButton.addEventListener('click', () => {
      this._handleTrashButton();
    });
  }
};
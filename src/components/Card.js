export default class Card {

    constructor(data, cardConfig, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardConfig = cardConfig;
        this._handleCardClick = handleCardClick;
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
        this._setEventListeners();

        this._pic.src = this._link;
        this._pic.alt = this._name;
        this._element.querySelector(this._cardConfig.textElement).textContent = this._name;

        return this._element;

    }

    _handleLikeButton() {
        this._likeButton.classList.toggle(this._cardConfig.likeElementActiveClass);
    }

    _handleTrashButton() {
        this._element.remove();
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
import * as index from './index.js';
import { formValidator } from './formValidator';
import * as constants from './constants.js'; 

class Card {

    constructor(data, templateSelector, cardConfig) {

        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._cardConfig = cardConfig;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector(this._cardConfig.cardElement)
            .cloneNode(true);

        return cardElement;
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

    _setEventListeners() {
        this._pic.addEventListener('click', () => {
            this._handleOpenPopup();
        });

        this._likeButton.addEventListener('click', () => {
            this._likeButton.classList.toggle(this._cardConfig.likeElementActiveClass);
        });

        this._trashButton.addEventListener('click', () => {
            this._element.remove();
        });
    }

    _handleOpenPopup() {
        showPicture(this._name, this._link);
    }

};

initialCards.forEach((item) => {
    const card = new Card(item, '.card-template', cardConfig);
    const cardElement = card.generateCard();
    document.querySelector('.elements-container').append(cardElement);
});


export { initialCards, Card };
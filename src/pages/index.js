import './index.css'

import FormValidator from '../components/FormValidator.js';

import {
    cardConfig,
    validationConfig,
    initialCards,
    popupName,
    popupHobby,
    popupFormEdit,
    popupFormAdd,
    buttonPopupOpen,
    addImageOpen
} from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';

const popupOpenImage = new PopupWithImage('.popup_type_show-pic');
const userInfo = new UserInfo({
    nameSelector: '.profile-info__name',
    aboutSelector: '.profile-info__profession'
});

const formValidatorEdit = new FormValidator(validationConfig, popupFormEdit);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(validationConfig, popupFormAdd);
formValidatorAdd.enableValidation();

export function handleCardClick(link, title) {
    popupOpenImage.open(link, title)
};
popupOpenImage._setEventListeners();

const defaultCards = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, cardConfig, handleCardClick);
        const cardElement = card.generateCard();
        return cardElement;
    }

}, '.elements-container');
defaultCards.renderItems();

const popupWithFormEdit = new PopupWithForm('.popup_type_profile-edit', () => {
    userInfo.setUserInfo({
        name: popupName.value,
        about: popupHobby.value
    });
    popupWithFormEdit.close();
});
popupWithFormEdit.setEventListeners();

const popupWithFormAdd = new PopupWithForm('.popup_type_add-pic', (data) => {
    const card = new Card(data, cardConfig, handleCardClick);
    const cardElement = card.generateCard();
    defaultCards.addItem(cardElement)
    popupWithFormAdd.close();
});
popupWithFormAdd.setEventListeners();

buttonPopupOpen.addEventListener('click', () => {
    const { name, about } = userInfo.getUserInfo();
    popupName.value = name;
    popupHobby.value = about;
    formValidatorEdit.resetFormValidation();
    popupWithFormEdit.open();
});

addImageOpen.addEventListener('click', function (evt) {
    evt.preventDefault();
    popupFormAdd.reset();
    formValidatorAdd.resetFormValidation();
    popupWithFormAdd.open();
});
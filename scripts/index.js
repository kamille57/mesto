import { FormValidator } from './formValidator.js';
import { cardConfig, 
         validationConfig, 
         initialCards, 
         popupName, 
         popupHobby, 
         popupFormEdit, 
         popupFormAdd,
         buttonPopupOpen,
         popupOpenImage,
         userInfo,
         addImageOpen
        } from './constants.js';
import { Card } from './card.js';
import { Section } from './section.js';
import { PopupWithForm } from './popupWithForm.js';

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
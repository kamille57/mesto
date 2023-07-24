import './index.css'

import FormValidator from '../components/FormValidator.js';

import Api from '../components/Api.js'

import {
  cardConfig,
  validationConfig,
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

const popupWithImage = new PopupWithImage('.popup_type_show-pic');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
  headers: {
    authorization: '84f0b731-4685-4b31-9185-d609841667ca',
    'Content-Type': 'application/json'
  }
});


const formValidatorEdit = new FormValidator(validationConfig, popupFormEdit);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(validationConfig, popupFormAdd);
formValidatorAdd.enableValidation();

function handleCardClick(link, title) {
  popupWithImage.open(link, title);
}

popupWithImage.setEventListeners();

function handleDeleteClick(card) {
  // ????
}

function createCard(item) {
  const card = new Card(item, cardConfig, handleCardClick, handleDeleteClick);
  return card.generateCard();
}

const cardsList = new Section({
  items: [], // Provide initialCards array here
  renderer: createCard
}, '.elements-container');
cardsList.renderItems();

const popupWithFormEdit = new PopupWithForm('.popup_type_profile-edit', (data) => {
  userInfo.setUserInfo({
    name: data.name,
    about: data.about
    
  });
  popupWithFormEdit.close();
});

popupWithFormEdit.setEventListeners();

const popupWithFormAdd = new PopupWithForm('.popup_type_add-pic', (data) => {
  const cardElement = createCard(data);
  cardsList.addItem(cardElement);
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

const userInfo = new UserInfo({
  nameSelector: '.profile-info__name',
  aboutSelector: '.profile-info__profession',
  avatarSelector: '.profile-info__avatar'
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfoData, initialCardsData]) => {
    console.log('Информация о пользователе:', userInfoData);
    console.log('Начальные карточки:', initialCardsData);

    // Установка информации о пользователе на страницу
    userInfo.setUserInfo(userInfoData);

    initialCardsData.forEach(card => {
      const cardElement = createCard(card);
      cardsList.addItem(cardElement);
    });
  });

addImageOpen.addEventListener('click', function (evt) {
  evt.preventDefault();
  formValidatorAdd.resetFormValidation();
  popupWithFormAdd.open();
});



Promise.all([api.getUserInfo(), api.getInitialCards()]) 
  .then(([userInfoData, initialCardsData]) => { 
    console.log('Информация о пользователе:', userInfoData); 
    console.log('Начальные карточки:', initialCardsData); 
 
    initialCardsData.forEach(card => { 
      const cardElement = createCard(card); 
      cardsList.addItem(cardElement); 
    }); 
 
    const cardId = 'cardId'; // Replace with the actual card ID 
    api.deleteCard(cardId) 
      .then(response => { 
        console.log('Карточка успешно удалена:', response); 
      }) 
      .catch(error => { 
        console.error('Ошибка при удалении карточки:', error); 
      }); 
  });
import './index.css'

import FormValidator from '../components/FormValidator.js';

import Api from '../components/Api.js'

import {
  cardConfig,
  validationConfig,
  popupName,
  popupHobby,
  popupAvatar,
  popupFormEdit,
  popupFormAdd,
  buttonPopupOpen,
  addImageOpen,
  buttonAvatarOpen,
  popupFormAvatar,
  likeButtonElement,
  likeButtonElementActive
} from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
  headers: {
    authorization: '84f0b731-4685-4b31-9185-d609841667ca',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  nameSelector: '.profile-info__name',
  aboutSelector: '.profile-info__profession',
  avatarSelector: '.profile-info__avatar'
});

const popupWithImage = new PopupWithImage('.popup_type_show-pic');

const formValidatorEdit = new FormValidator(validationConfig, popupFormEdit);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(validationConfig, popupFormAdd);
formValidatorAdd.enableValidation();

const formValidatorAvatar = new FormValidator(validationConfig, popupFormAvatar);
formValidatorAvatar.enableValidation();

function handleCardClick(link, title) {
  popupWithImage.open(link, title);
}

popupWithImage.setEventListeners();

function createCard(item) {
  const card = new Card(item, cardConfig, handleCardClick, handleDeleteClick);

  return card.generateCard();
}

function handleDeleteClick(card) {
  const cardId = card.getCardId();
  api.deleteCard(cardId)
    .then(() => {
      
    })
    .catch((error) => {
      console.log(error);
    });
}

const cardsList = new Section({
  items: [], // Provide initialCards array here
  renderer: createCard
}, '.elements-container');
cardsList.renderItems();

const popupWithFormEdit = new PopupWithForm('.popup_type_profile-edit', (data) => {
  userInfo.setUserInfo({
    name: data.name,
    about: data.about,
  });
  api.updateUserInfo(data);
  popupWithFormEdit.close();
});

popupWithFormEdit.setEventListeners();

const popupWithFormAdd = new PopupWithForm('.popup_type_add-pic', (data) => {
  const cardElement = createCard(data);
  cardsList.addItem(cardElement);
  popupWithFormAdd.close();
});
popupWithFormAdd.setEventListeners();

const popupWithFormAvatar = new PopupWithForm('.popup_type_update-avatar', (data) => {   
  console.log('data со строки 103:', data)

  api.updateUserAvatar(data)  
    .then(() => {  
      userInfo.setUserAvatar(data.avatar);
      popupWithFormAvatar.close();  
    })  
    .catch((error) => {  
      console.error('Ошибка при обновлении аватара:', error);  
    });  
});

popupWithFormAvatar.setEventListeners();

buttonAvatarOpen.addEventListener('click', () => { 
  const avatar = userInfo.getUserAvatar(); 
  formValidatorAvatar.resetFormValidation(); 
  popupWithFormAvatar.open(); 
  popupAvatar.value = avatar; // Установите ссылку на аватар в поле ввода
});

buttonPopupOpen.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  popupName.value = name;
  popupHobby.value = about;
  formValidatorEdit.resetFormValidation();
  popupWithFormEdit.open();
});



Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfoData, initialCardsData]) => {
    console.log(userInfoData);
    console.log(initialCardsData);

    // Установка информации о пользователе на страницу
    userInfo.setUserInfo(userInfoData);
    userInfo.setUserAvatar(userInfoData.avatar);
    console.log('аватар:', userInfoData.avatar);
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

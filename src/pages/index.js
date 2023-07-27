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

function createCard(data, currentUserId) { 
  const apiObj = { 
    like: (id) => api.likeCard(id), 
    dislike:  (id) => api.dislikeCard(id), 
    delete:  (id) => api.deleteCard(id),
    isOwner: (data, currentUserId) => checkOwner(data, currentUserId)
  } 
 
  const card = new Card(data, cardConfig, handleCardClick, apiObj, currentUserId);   
 
  return card.generateCard(); 
}


const cardsList = new Section({
  items: [], 
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
  console.log(data);
  const cardElement = createCard(data, true);
  cardsList.addItem(cardElement);
  api.addCard(data);
  popupWithFormAdd.close();
});
popupWithFormAdd.setEventListeners();

const popupWithFormAvatar = new PopupWithForm('.popup_type_update-avatar', (data) => {   
  console.log('data со строки 103:', data) 
  api.updateUserAvatar(data)   
    .then((res) => {   
      userInfo.setUserAvatar(res.avatar);
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
    const currentUserId = userInfoData._id
    console.log('аватар:', userInfoData.avatar);
    initialCardsData.forEach(card => {
      const cardElement = createCard(card, currentUserId);
      cardsList.addItem(cardElement);
    });
  });

addImageOpen.addEventListener('click', function (evt) {
  evt.preventDefault();
  formValidatorAdd.resetFormValidation();
  popupWithFormAdd.open();
});



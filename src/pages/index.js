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
} from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
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
  avatarSelector: '.profile-info__avatar',
});
const popupWithImage = new PopupWithImage('.popup_type_show-pic');
popupWithImage.setEventListeners();

const formValidatorEdit = new FormValidator(validationConfig, popupFormEdit);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(validationConfig, popupFormAdd);
formValidatorAdd.enableValidation();

const formValidatorAvatar = new FormValidator(validationConfig, popupFormAvatar);
formValidatorAvatar.enableValidation();

function createCard(data, currentUserId) {
  const apiObj = {
    like: (id) => api.likeCard(id),
    dislike: (id) => api.dislikeCard(id),
    delete: (id) => api.deleteCard(id)
  }

  const handleCardClick = (link, title) => {
    popupWithImage.open(link, title);
  }

  const card = new Card(data, cardConfig, handleCardClick, apiObj, currentUserId, popupConfirm.open.bind(popupConfirm));

  return card.generateCard();
}

const cardsList = new Section({
  items: [],
  renderer: createCard
}, '.elements-container');

api.getInitialCards()
  .then(cards => {
    cardsList.items = cards;
    cardsList.renderItems();
  });

const popupWithFormEdit = new PopupWithForm('.popup_type_profile-edit', (data) => {
  api.updateUserInfo(data)
    .then((res) => {
      console.log(res);
      userInfo.setUserInfo(res); // response содержит данные, полученные с сервера
      popupWithFormEdit.close();
    })
    .catch((error) => {
      console.log(error);
    });
});

popupWithFormEdit.setEventListeners();

const popupWithFormAdd = new PopupWithForm('.popup_type_add-pic', (data) => {
  popupWithFormAdd.setLoading();
  const { userId } = userInfo.getUserInfo(); // получение данных из метода getUserInfo
  api.addCard({ name: data.name, link: data.link })
    .then((res) => {
      const cardElement = createCard(res, userId); // использование ответа сервера для создания карточки
      cardsList.addItem(cardElement);
      popupWithFormAdd.close(); // Закрытие попапа при успешном ответе сервера
    })
    .catch((error) => {
      console.log(error); // Обработка ошибки
    });
});
popupWithFormAdd.setEventListeners();


const popupConfirm = new PopupConfirm('.popup_type_delete-confirm');
popupConfirm.setConfirmCallback(() => {
  console.log('Submit button clicked');  
});
popupConfirm.setEventListeners();

const popupWithFormAvatar = new PopupWithForm('.popup_type_update-avatar', (data) => {
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfoData, initialCardsData]) => {
    userInfo.setUserInfo(userInfoData); // Установка информации о пользователе на страницу
    userInfo.setUserAvatar(userInfoData.avatar);
    const currentUserId = userInfoData._id;
    initialCardsData.forEach(card => {
      const cardElement = createCard(card, currentUserId);
      cardsList.addItem(cardElement);
    });
    popupWithFormAdd;
    cardsList.renderItems(); // Отрисовка карточек после получения данных с сервера
  });

addImageOpen.addEventListener('click', function (evt) {
  evt.preventDefault();
  formValidatorAdd.resetFormValidation();
  popupWithFormAdd.open();
});

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
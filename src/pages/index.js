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

const popupConfirm = new PopupConfirm('.popup_type_delete-confirm');
popupConfirm.setEventListeners();

function createCard(data, currentUserId) {
  const handleCardClick = (link, title) => {
    popupWithImage.open(link, title);
  };

  const handleDeleteCard = (card) => {
    card.removeCard();
  };

  const apiObj = {
    like: (id) => {
      api.likeCard(id)
        .then((res) => {
          card.setCardLikes(res.likes);
          card.handleLikeButton();
        })
        .catch((err) => console.log(err));
    },
    dislike: (id) => {
      api.dislikeCard(id)
        .then((res) => {
          card.setCardLikes(res.likes);
          card.handleLikeButton();
        })
        .catch((err) => console.log(err))
    },
    delete: (id) => {
      const deleteCard = () => {
        api.deleteCard(id)
          .then(() => {
            popupConfirm.close();
            handleDeleteCard(card);
          })
          .catch((err) => console.log(err));
      };

      popupConfirm.setConfirmCallback(deleteCard);
      popupConfirm.open(deleteCard);
    }
  };

  const card = new Card(data, cardConfig, handleCardClick, apiObj, currentUserId);

  return card.generateCard();
}

const cardsList = new Section({
  items: [],
  renderer: createCard
}, '.elements-container');

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfoData, initialCardsData]) => {
    userInfo.setUserInfo(userInfoData); // Установка информации о пользователе на страницу
    userInfo.setUserAvatar(userInfoData.avatar);
    const currentUserId = userInfoData._id;
    initialCardsData.forEach((card) => {
      const cardElement = createCard(card, currentUserId);
      cardsList.addItem(cardElement);
    });
    cardsList.renderItems(); // Отрисовка карточек после получения данных с сервера
  })
  .catch((error) => {
    console.log(error);
  });

const popupWithFormEdit = new PopupWithForm('.popup_type_profile-edit', (data) => {
  popupWithFormEdit.renderLoading(true);
  api.updateUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res); // res данные, полученные с сервера
      popupWithFormEdit.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupWithFormEdit.renderLoading(false);
    });
});

popupWithFormEdit.setEventListeners();

const popupWithFormAdd = new PopupWithForm('.popup_type_add-pic', (data) => {
  popupWithFormAdd.renderLoading(true);
  const { userId } = userInfo.getUserInfo(); // получение данных из метода getUserInfo
  api.addCard({ name: data.name, link: data.link })
    .then((res) => {
      const cardElement = createCard(res, userId); // использование ответа сервера для создания карточки
      cardsList.addItem(cardElement);
      popupWithFormAdd.close(); // Закрытие попапа при успешном ответе сервера
    })
    .catch((error) => {
      console.log(error); // Обработка ошибки
    })
    .finally(() => {
      popupWithFormAdd.renderLoading(false);
    });
});

popupWithFormAdd.setEventListeners();

const popupWithFormAvatar = new PopupWithForm('.popup_type_update-avatar', (data) => { 
  popupWithFormAvatar.renderLoading(true); 
  api.updateUserAvatar(data) 
    .then((res) => { 
      userInfo.setUserAvatar(res.avatar); 
      popupWithFormAvatar.close(); 
    }) 
    .catch((error) => { 
      console.error('Ошибка при обновлении аватара:', error); 
    }) 
    .finally(() => {
      popupWithFormAvatar.renderLoading(false); 
    }); 
}); 

popupWithFormAvatar.setEventListeners();

addImageOpen.addEventListener('click', function (evt) {
  evt.preventDefault();
  formValidatorAdd.resetFormValidation();
  popupWithFormAdd.open();
});

buttonAvatarOpen.addEventListener('click', () => {
  const avatar = userInfo.getUserAvatar();
  formValidatorAvatar.resetFormValidation();
  popupWithFormAvatar.open();
  popupAvatar.value = avatar; // Установить ссылку на аватар в поле ввода
});

buttonPopupOpen.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  popupName.value = name;
  popupHobby.value = about;
  formValidatorEdit.resetFormValidation();
  popupWithFormEdit.open();
});
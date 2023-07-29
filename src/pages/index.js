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
  avatarSelector: '.profile-info__avatar',
});

const popupWithImage = new PopupWithImage('.popup_type_show-pic');


const openConfirmPopUp = new PopupWithForm('#popupDeleteConfirm', function (data) {
  console.log(data);
  console.log('Вот тут мы должны удилть карточку, т.к. нажали ОК');
  // cardID - не хватает
  // this - не хватает
  api.deleteCard(cardId)
    .then((res) => {
      this._removeCard(res._id);
    })
    .catch((error) => {
      console.error("Произошла ошибка при удалении карточки:", error);
    });


})

openConfirmPopUp.setEventListeners();

const formValidatorEdit = new FormValidator(validationConfig, popupFormEdit);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(validationConfig, popupFormAdd);
formValidatorAdd.enableValidation();

const formValidatorAvatar = new FormValidator(validationConfig, popupFormAvatar);
formValidatorAvatar.enableValidation();

function handleCardClick(link, title) {
  popupWithImage.open(link, title);
}
function handleTrashClick(that) {
  openConfirmPopUp.open();
  console.log('Мы в этой точке');
  // submitHandler();
}

popupWithImage.setEventListeners();

function createCard(data, currentUserId) {
  console.log(currentUserId);
  const apiObj = {
    like: (id) => api.likeCard(id),
    dislike: (id) => api.dislikeCard(id),
    delete: (id) => api.deleteCard(id),
  }

  const card = new Card(data, cardConfig, handleCardClick, apiObj, currentUserId, handleTrashClick);

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
      userInfo.setUserInfo(res);  // response содержит данные, полученные с сервера
      popupWithFormEdit.close();
    })
    .catch((error) => {
      console.log(error);
    });
});

popupWithFormEdit.setEventListeners();

const popupWithFormAdd = new PopupWithForm('.popup_type_add-pic', (data) => {
  const { userId } = userInfo.getUserInfo(); // получение данных из метода getUserInfo 
  console.log(userId);

  api.addCard({ name: data.name, link: data.link })
    .then((res) => {
      console.log(res); // ответ сервера 
      console.log(userId);
      const cardElement = createCard(res, userId); // использование ответа сервера для создания карточки
      cardsList.addItem(cardElement);
      popupWithFormAdd.close(); // Закрытие попапа при успешном ответе сервера 
    })
    .catch((error) => {
      console.log(error); // Обработка ошибки 
    });
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




Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfoData, initialCardsData]) => {
    console.log('userInfoData');
    console.log(userInfoData);
    console.log(initialCardsData);

    // Установка информации о пользователе на страницу
    userInfo.setUserInfo(userInfoData);
    userInfo.setUserAvatar(userInfoData.avatar);
    const currentUserId = userInfoData._id;
    console.log('покажи юзера', userInfoData._id);
    console.log('аватар:', userInfoData.avatar);
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



// Задача - удалять карточку только при получении подтверждения
// 1. При нажатии на иконку - открывать попап удаления карточки И создавать промис, который ожидает "ответ" от карточки
// ИЛИ создать колбэк функцию которая сработает при САБМИТЕ (при нажатии на крестик форма просто закрывается и всё)
// 2. У попапа  2 кнопки - да и отмена
// 3. Слушаем ОБЕ кнопки (на клик ИЛИ на сабмит - для кнопки "да")
// 4. При нажатии на одну из кнопкок возвращать ответ (который придёт в промис) - тру или фалс
// 4. ИЛИ при нажатии - вызываем колбэк функцию (которая была описана где-то тут и передана в new Popup в кчестве аргумента handleFormSubmit (пример - apiObj))
// 5. Then, смотрим на ответ и если он тру - удаляем карту

// openConfirmPopUp().then((res) => {
//   if (res.answer === true) {
//     console.log(" Удалить карточку");
//     // card.remove();
//   } else {
//     console.log("ничего не делаем");
//   }
// }
// )

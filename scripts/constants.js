const popupEdit = document.querySelector('.popup_type_profile-edit');
const popupAdd = document.querySelector('.popup_type_add-pic');
const popupElement = document.querySelector('.popup_type_show-pic');

// переменные для формы edit info
const popupName = document.querySelector('#name');
const popupHobby = document.querySelector('#hobby');
const profileName = document.querySelector('.profile-info__name');
const profileHobby = document.querySelector('.profile-info__profession');

// создаем галерею картинок template + user
const addCardField = document.querySelector('#placeName');
const addLinkField = document.querySelector('#placeLink'); // инпут ввод линка
const addCardButton = document.querySelector('#addSaveButton'); // инпут ввод места

// формы для заполнения 
const popupFormEdit = document.querySelector('#popupEditForm');
const popupFormAdd = document.querySelector('#popupAddForm');

// кнопки открытия попапов
const buttonPopupOpen = document.querySelector('.profile-info__edit-button');
const addImageOpen = document.querySelector('.profile-info__add-button');

// переменные класса Card
const popupImage = document.querySelector('.popup__pic');
const popupText = document.querySelector('.popup__text');
const popupCloseButton = document.querySelector('#cardClose');
const popups = document.querySelectorAll('.popup');

const cardConfig = {
  cardElement: '.element',
  picElement: '.element__pic',
  textElement: '.element__text',
  likeElement: '.element__like',
  trashElement: '.element__trash',
  likeElementActiveClass: 'element__like_active'
};

const validationConfig = {
  formElement: '.popup-form',
  inputElement: '.popup__input',
  submitButtonSelector: '.popup-form__save-button',
  invalidButtonClass: 'popup-form__save-button_invalid',
  inputErrorClass: 'popup__input_error',
  errorInvalidClass: 'error_invalid',
  fieldSetSelector: '.popup-form__set',
};


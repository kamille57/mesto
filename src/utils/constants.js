export const popupName = document.querySelector('#name');
export const popupHobby = document.querySelector('#hobby');
export const popupFormEdit = document.querySelector('#popupEditForm');
export const popupFormAdd = document.querySelector('#popupAddForm');
export const buttonPopupOpen = document.querySelector('.profile-info__edit-button');
export const addImageOpen = document.querySelector('.profile-info__add-button');

export const cardConfig = {
  cardTemplate: '.card-template',
  cardContainer: '.elements-container',
  cardElement: '.element',
  picElement: '.element__pic',
  textElement: '.element__text',
  likeElement: '.element__like',
  trashElement: '.element__trash',
  likeElementActiveClass: 'element__like_active'
};

export const validationConfig = {
  formElement: '.popup-form',
  inputElement: '.popup__input',
  cardTemplateSelector: '.card-template',
  elementsContainerSelector: '.elements-container',
  submitButtonSelector: '.popup-form__save-button',
  invalidButtonClass: 'popup-form__save-button_invalid',
  inputErrorClass: 'popup__input_error',
  errorInvalidClass: 'error_invalid',
  fieldSetSelector: '.popup-form__set',
};

const cardConfig = {
  picElement: '.element__pic',
  textElement: '.element__text',
  likeElement: '.element__like',
  trashElement: '.element__trash',
  likeElementActiveClass: 'element__like_active'
};

const popupEdit = document.querySelector('.popup_type_profile-edit');
const popupAdd = document.querySelector('.popup_type_add-pic');
const popupImage = document.querySelector('.popup_type_show-pic');

// кнопки открытия попапов
const buttonPopupOpen = document.querySelector('.profile-info__edit-button');
const addImageOpen = document.querySelector('.profile-info__add-button');

// формы для заполнения 
const popupFormEdit = document.querySelector('#popupEditForm');
const popupFormAdd = document.querySelector('#popupAddForm');

// переменные для формы edit info
const popupName = document.querySelector('#name');
const popupHobby = document.querySelector('#hobby');
const profileName = document.querySelector('.profile-info__name');
const profileHobby = document.querySelector('.profile-info__profession');

const togglePopupState = (popupToToggle) => popupToToggle.classList.toggle('popup_opened');

// создаем галерею картинок template + user
const cardsContainer = document.querySelector('.elements-container');
const cardsTemplate = document.querySelector('#template-cards').content;
const cardTemplate = cardsTemplate.querySelector('.element');
const popupFormCard = document.querySelector('popupCard'); // id формы попапа
const popupPic = document.querySelector('.popup__pic');
const popupText = document.querySelector('.popup__text');
const addCardField = document.querySelector('#placeName');
const addLinkField = document.querySelector('#placeLink'); // инпут ввод линка
const addCardButton = document.querySelector('#addSaveButton'); // инпут ввод места
const popups = document.querySelectorAll('.popup');

function createElement(link, name, cardConfig) {
  const cardElement = cardTemplate.cloneNode(true);
  const elementPic = cardElement.querySelector(cardConfig.picElement);
  const elementText = cardElement.querySelector(cardConfig.textElement);
  elementPic.src = link;
  elementPic.alt = name;
  elementText.textContent = name;

  const elementLike = cardElement.querySelector(cardConfig.likeElement);
  elementLike.addEventListener('click', function () {
    elementLike.classList.toggle(cardConfig.likeElementActiveClass);
  });

  const elementTrash = cardElement.querySelector(cardConfig.trashElement);
  elementTrash.addEventListener('click', function () {
    cardElement.remove();
  });

  elementPic.addEventListener('click', () => {
    togglePopupState(popupImage);
    popupPic.src = link;
    popupText.textContent = name;
    popupPic.alt = name;
  });

  return cardElement;
}

initialCards.forEach((card) => {
  const cardElement = createElement(card.link, card.name, cardConfig);
  cardsContainer.append(cardElement);
});

function newCard() {
  const elementsDescription = createElement(addLinkField.value, addCardField.value);
  cardsContainer.prepend(elementsDescription);
};

function openEditPopup() {
  togglePopupState(popupEdit);
  popupName.value = profileName.textContent;
  popupHobby.value = profileHobby.textContent;
  resetFormValidation(popupFormEdit, validationConfig);
};

function fillInfoForm(evt) {  // форма заполнения попапа с инфо
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileHobby.textContent = popupHobby.value;
  togglePopupState(popupEdit);
};

function fillAddForm(evt) { // форма заполнения попапа с картинкой
  evt.preventDefault();
  addCardField.value = "";
  addLinkField.value = "";
  resetFormValidation(popupFormAdd, validationConfig);
  togglePopupState(popupAdd);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePopupKeydown);
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePopupKeydown);
};

function handlePopupKeydown(event) { // функция закрытия окон на esc
  if (event.key === 'Escape') {
    popups.forEach((popup) => {
      closePopup(popup);
    });
  }
}

function handlePopupCloseClick(event) {
  const target = event.target;
  if (target.classList.contains('popup__closed')) {
    const popup = target.closest('.popup');
    closePopup(popup);
  }
}

function handlePopupOverlayMouseDown(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

popups.forEach((popup) => {
  const closePopupElements = popup.querySelectorAll('.popup__closed');
  closePopupElements.forEach((closePopupElement) => {
    closePopupElement.addEventListener('click', handlePopupClose);
  });
});

function handlePopupClose(event) {
  const popup = event.target.closest('.popup');
  popup.classList.remove('popup_opened');
};

buttonPopupOpen.addEventListener('click', openEditPopup);// edit button
addImageOpen.addEventListener('click', fillAddForm);// add button
popupFormEdit.addEventListener('submit', fillInfoForm);
popupFormAdd.addEventListener('submit', fillAddForm);
addCardButton.addEventListener('click', newCard) // добавляет пользовательскую картинку на страницу

enableValidation(validationConfig);
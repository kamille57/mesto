const popupEdit = document.querySelector('.popup_type_profile-edit');
const popupAdd = document.querySelector('.popup_type_add-pic');

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

// создаем галерею картинок template + user
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
    openPopup(popupImage);
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


function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePopupKeydown);
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePopupKeydown);
};

function openEditPopup() { // заполняем инпуты данными со страницы
  openPopup(popupEdit);
  popupName.value = profileName.textContent;
  popupHobby.value = profileHobby.textContent;
  resetFormValidation(popupFormEdit, validationConfig);
};

function fillInfoForm(evt) {  // заполнение инфо на главной странице
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileHobby.textContent = popupHobby.value;
  closePopup(popupEdit);
};

function fillAddForm(evt) { // форма заполнения попапа с картинкой
  evt.preventDefault();
  addCardField.value = "";
  addLinkField.value = "";
  resetFormValidation(popupFormAdd, validationConfig);
  openPopup(popupAdd);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePopupKeydown);
};

function handlePopupKeydown(event) { // функция закрытия окон на esc
  if (event.key === 'Escape') {
    popups.forEach((popup) => {
      closePopup(popup);
    });
  }
}

function handlePopupCloseClick(event) { // функция закрытия окон на крестик
  const target = event.target;
  if (target.classList.contains('popup__closed')) {
    const popup = target.closest(popups);
    closePopup(popup);
  }
}

function handlePopupClose(event) {
  const popup = event.target.closest('.popup');
  popup.classList.remove('popup_opened');
};

popups.forEach((popup) => { // функция закрытия всех окон на overlay 
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.currentTarget);
    }
  });
});

popups.forEach((popup) => {
  const closePopupElement = popup.querySelector('.popup__closed');
  closePopupElement.addEventListener('click', handlePopupClose);
});

buttonPopupOpen.addEventListener('click', openEditPopup);// edit button
addImageOpen.addEventListener('click', fillAddForm);// add button
popupFormEdit.addEventListener('submit', fillInfoForm);
popupFormAdd.addEventListener('submit', fillAddForm);
addCardButton.addEventListener('click', newCard) // добавляет пользовательскую картинку на страницу


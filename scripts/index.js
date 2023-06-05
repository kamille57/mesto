// модификаторы попапов
const popupEdit = document.querySelector('.popup_type_profile-edit');
const popupAdd = document.querySelector('.popup_type_add-pic');
const popupImage = document.querySelector('.popup_type_show-pic');

// кнопки открытия попапов
const buttonPopupOpen = document.querySelector('.profile-info__edit-button');
const addImageOpen = document.querySelector('.profile-info__add-button');

// формы для заполнения 
const popupFormEdit = document.querySelector('#popupEdit');
const popupFormAdd = document.querySelector('#popupAdd');

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

function createElement(link, name) {
  const cardElement = cardTemplate.cloneNode(true); // вывод карточки из массива
  const elementPic = cardElement.querySelector('.element__pic'); // картинка из темплэйта
  const elementText = cardElement.querySelector('.element__text'); // текст из темплэйта
  const elementLike = cardElement.querySelector('.element__like');
  const elementTrash = cardElement.querySelector('.element__trash');

  elementPic.src = link;
  elementText.textContent = name;
  elementPic.alt = name;

  elementLike.addEventListener('click', function () {   // ставим лайки
    elementLike.classList.toggle('element__like_active');
  });

  elementTrash.addEventListener('click', function () {   // удаляем картинку
    cardElement.remove();
  });

  elementPic.addEventListener('click', () => {
    togglePopupState(popupImage);
    popupPic.src = link;
    popupText.textContent = name;
    popupPic.alt = name;
  });

  return cardElement;
};

initialCards.forEach((card) => {
  const elementsDescription = createElement(card.link, card.name);
  cardsContainer.append(elementsDescription);
});

const addCardField = document.querySelector('#placeName');
const addLinkField = document.querySelector('#placeLink'); // инпут ввод линка
const addCardButton = document.querySelector('#addSaveButton'); // инпут ввод места

addCardButton.addEventListener('click', newCard) // добавляет пользовательскую картинку на страницу
function newCard() {
  const elementsDescription = createElement(addLinkField.value, addCardField.value);
  cardsContainer.prepend(elementsDescription);
};

function openPopup() {
  togglePopupState(popupEdit);
  popupName.value = profileName.textContent;
  popupHobby.value = profileHobby.textContent;
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
  togglePopupState(popupAdd);
};

buttonPopupOpen.addEventListener('click', openPopup);// edit button
addImageOpen.addEventListener('click', fillAddForm);// add button
popupFormEdit.addEventListener('submit', fillInfoForm);
popupFormAdd.addEventListener('submit', fillAddForm);

document.querySelectorAll('.popup').forEach((popup) => { // функция закрытия всех окон на esc
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      popup.classList.remove('popup_opened');
    }
  });
});

document.querySelectorAll('.popup').forEach((popup) => { // функция закрытия всех окон на крестик
  popup.addEventListener('click', (evt) => {
    const target = evt.target;
    if (target.classList.contains('popup__closed')) {
      popup.classList.remove('popup_opened');
    }
  });
});

document.querySelectorAll('.popup').forEach((popup) => { // функция закрытия всех окон на overlay
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      popup.classList.remove('popup_opened');
    }
  });
});




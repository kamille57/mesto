// модификаторы попапов
const popupEdit = document.querySelector('.popup_type_profile-edit');
const popupAdd = document.querySelector('.popup_type_add-pic');
const popupImage = document.querySelector('.popup_type_show-pic'); 

// кнопки открытия попапов
const buttonPopupOpen = document.querySelector('.profile-info__edit-button');
const addImageOpen = document.querySelector('.profile-info__add-button');

// кнопки закрытия попапов
const buttonCloseEdit = document.querySelector('#editClose');
const buttonCloseAdd = document.querySelector('#addClose');
const buttonCardClose = document.querySelector('#cardClose');

// формы для заполнения 
const popupFormEdit = document.querySelector('#popupEdit');
const popupFormAdd = document.querySelector('#popupAdd');

// переменные для формы edit info
const popupName = document.querySelector('#name');
const popupHobby = document.querySelector('#hobby');
const profileName = document.querySelector('.profile-info__name');
const profileHobby = document.querySelector('.profile-info__profession');

const togglePopupState = (popupToToggle) => popupToToggle.classList.toggle('popup_opened');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
  
// создаем галерею картинок template + user
const cardsContainer = document.querySelector('.elements-container');
const cardsTemplate = document.querySelector('#template-cards').content;
const cardTemplate = cardsTemplate.querySelector('.element');

const popupFormCard = document.querySelector('popupCard'); // id формы попапа
const popupPic = document.querySelector('.popup__pic');
const popupText = document.querySelector('.popup__text');

function createElement (link, name) {    
  const cardElement = cardTemplate.cloneNode(true); //вывод карточки из массива
  const elementPic = cardElement.querySelector('.element__pic'); //картинка из темплэйта
  const elementText = cardElement.querySelector('.element__text'); //текст из темплэйта
  const elementLike = cardElement.querySelector('.element__like'); 
  const elementTrash = cardElement.querySelector('.element__trash'); 
  const toggleElLikeState = (likeToToggle) => likeToToggle.classList.toggle('element__like_active'); 

        elementPic.src = link;
        elementText.textContent = name;
        elementPic.alt = name;
  
elementLike.addEventListener('click', function (evt) {   // ставим лайки
  evt.target.toggleElLikeState();
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

const addCardField = document.getElementById('placeName');
const addLinkField = document.getElementById('placeLink'); //инпут ввод линка
const addCardButton = document.getElementById('addSaveButton'); //инпут ввод места
  
addCardButton.addEventListener('click', newCard) //добавляет пользовательскую картинку на страницу
  function newCard() {
    const elementsDescription = createElement(addLinkField.value, addCardField.value);
          cardsContainer.prepend(elementsDescription);
  };

function openPopup () {
    togglePopupState(popupEdit);
    popupName.value = profileName.textContent; 
    popupHobby.value = profileHobby.textContent;
};

function fillForm(evt) {  //форма заполнения попапа с инфо
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileHobby.textContent = popupHobby.value; 
  togglePopupState(popupEdit);
};


function fillAddForm(evt) { //форма заполнения попапа с картинкой
  evt.preventDefault();
  addCardField.value = "";
  addLinkField.value = "";
  togglePopupState(popupAdd);
};

buttonPopupOpen.addEventListener('click', openPopup);//edit button
addImageOpen.addEventListener('click', () => togglePopupState(popupAdd));//add button
buttonCloseEdit.addEventListener('click', () => togglePopupState(popupEdit));
buttonCloseAdd.addEventListener('click', () => togglePopupState(popupAdd));
buttonCardClose.addEventListener('click', () => togglePopupState(popupImage));
popupFormEdit.addEventListener('submit', fillForm);
popupFormAdd.addEventListener('submit', fillAddForm);
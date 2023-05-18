let popupEdit = document.querySelector('.popup_edit');
let popupAdd = document.querySelector('.popup_add');
let buttonPopupOpen = document.querySelector('.profile-info__edit-button');
let addImageOpen = document.querySelector('.profile-info__add-button');
let buttonCloseEdit = document.getElementById('editClose');
let buttonCloseAdd = document.getElementById('addClose');
let popupFormEdit = document.getElementById('popupEdit');
let popupFormAdd = document.getElementById('popupAdd');
let popupName = document.getElementById('name');
let popupHobby = document.getElementById('hobby');
let profileName = document.querySelector('.profile-info__name');
let profileHobby = document.querySelector('.profile-info__profession');
let togglePopupState = (popupToToggle) => popupToToggle.classList.toggle('popup_opened');





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
  

  const cardsContainer = document.querySelector('.elements-container');
  const cardsTemplate = document.querySelector('#template-cards').content;
  const cardTemplate = cardsTemplate.querySelector('.element');
  
  
function createElement (link, name) {    
  const cardElement = cardTemplate.cloneNode(true); //вывод карточки из массива
  console.log(cardElement);
        cardElement.querySelector('.element__pic').src = link;
        cardElement.querySelector('.element__text').textContent = name;
        cardElement.querySelector('.element__pic').alt = name;
        cardElement.querySelector('.element__like').addEventListener('click', function (evt) {   //ставим лайки
          evt.target.classList.toggle('element__like_active');
          });
        cardElement.querySelector('.element__trash').addEventListener('click', function () {   //удаляем картинку
          cardElement.remove();
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
  
  addCardButton.addEventListener('click', newCard)
  function newCard() {
    const elementsDescription = createElement(addLinkField.value, addCardField.value);
    cardsContainer.prepend(elementsDescription);
    console.log(addCardField.value);
    console.log(addLinkField.value);
  }

function openPopup () {
    togglePopupState(popupEdit);
    popupName.value = profileName.textContent; 
    popupHobby.value = profileHobby.textContent;
};

function fillForm(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileHobby.textContent = popupHobby.value; 
    togglePopupState(popupEdit);
};





function fillAddForm(evt) {
  evt.preventDefault();
  addCardField.value = "";
  addLinkField.value = "";
  togglePopupState(popupAdd);
};

buttonPopupOpen.addEventListener('click', (openPopup));
addImageOpen.addEventListener('click', () => togglePopupState(popupAdd));
buttonCloseEdit.addEventListener('click', () => togglePopupState(popupEdit));
buttonCloseAdd.addEventListener('click', () => togglePopupState(popupAdd));
popupFormEdit.addEventListener('submit', fillForm);
popupFormAdd.addEventListener('submit', fillAddForm);



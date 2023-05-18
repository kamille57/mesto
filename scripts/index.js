let popupEdit = document.querySelector('.popup_edit');
let popupAdd = document.querySelector('.popup_add');
let buttonPopupOpen = document.querySelector('.profile-info__edit-button');
let buttonCloseEdit = document.getElementById('editClose');
let buttonCloseAdd = document.getElementById('addClose');
let popupFormEdit = document.getElementById('popupEdit');
let popupFormAdd = document.getElementById('popupAdd');
let popupName = document.getElementById('name');
let popupHobby = document.getElementById('hobby');
let profileName = document.querySelector('.profile-info__name');
let profileHobby = document.querySelector('.profile-info__profession');
let togglePopupState = (popupToToggle) => popupToToggle.classList.toggle('popup_opened');
let addImageOpen = document.querySelector('.profile-info__add-button');
const elementsContainer = document.querySelector('.elements');
const figureTemplate = document.querySelector('#elements').content;
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

const elementsDescription = initialCards.map(function (item) {
    return {
       name: item.name,
       link: item.link
    };
});

function createImage () {
   elementsDescription.forEach(addFigure);
}

function addFigure({name, link}) {
    const figureElement = figureTemplate.querySelector('.element').cloneNode(true);
    figureElement.querySelector('.element__pic').src = link;
    figureElement.querySelector('.element__text').textContent = name;
    elementsContainer.prepend(figureElement);
};

createImage();

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


buttonPopupOpen.addEventListener('click', (openPopup));
addImageOpen.addEventListener('click', () => togglePopupState(popupAdd));
buttonCloseEdit.addEventListener('click', () => togglePopupState(popupEdit));
buttonCloseAdd.addEventListener('click', () => togglePopupState(popupAdd));
popupFormEdit.addEventListener('submit', fillForm);
popupFormAdd.addEventListener('submit', () => togglePopupState(popupAdd));
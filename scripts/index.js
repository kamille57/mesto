import { FormValidator } from './formValidator.js';
import { cardConfig, validationConfig, initialCards } from './constants.js';
import { Card } from './card.js';

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
const popups = document.querySelectorAll('.popup');


function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handlePopupKeydown);
};

export function showPicture(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupText.textContent = name;
    openPopup(popupElement);
};

function openEditPopup() { // заполняем инпуты данными со страницы
    openPopup(popupEdit);
    popupName.value = profileName.textContent;
    popupHobby.value = profileHobby.textContent;
    formValidatorEdit.enableValidation();
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
    formValidatorAdd.enableValidation();
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
};

function handlePopupClose(event) {
    const popup = event.target.closest('.popup');
    popup.classList.remove('popup_opened');
};

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(evt.currentTarget);
        }
    });
    const closePopupElement = popup.querySelector('.popup__closed');
    closePopupElement.addEventListener('click', handlePopupClose);
});

initialCards.forEach((data) => {
    const card = new Card(data, '.card-template', cardConfig);
    const cardElement = card.generateCard();

    // Добавляем в DOM
    document.querySelector('.elements-container').append(cardElement);
});

const formValidatorEdit = new FormValidator(validationConfig, popupFormEdit);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(validationConfig, popupFormAdd);
formValidatorAdd.enableValidation();

popupFormAdd.addEventListener('submit', (evt) => { 
    evt.preventDefault(); 
    const cardData = {
        name: addCardField.value,
        link: addLinkField.value
    }
    const card = new Card(cardData, '.card-template', cardConfig);   
    console.log(card);
    const cardElement = card.generateCard();  
    console.log(cardElement); 
    document.querySelector('.elements-container').prepend(cardElement);  
    closePopup(popupAdd);   
    popupFormAdd.reset();   
});

buttonPopupOpen.addEventListener('click', openEditPopup);// edit button
addImageOpen.addEventListener('click', fillAddForm);// add button
popupFormEdit.addEventListener('submit', fillInfoForm);
popupFormAdd.addEventListener('submit', fillAddForm);
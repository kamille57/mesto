let popup = document.querySelector('.popup');
let buttonPopupOpen = document.querySelector('.profile-info__edit-button');
let buttonPopupClose = document.querySelector('.popup__closed');
let popupForm = document.querySelector('.popup-form');
let popupName = document.getElementById('name');
let popupHobby = document.getElementById('hobby');
let profileName = document.querySelector('.profile-info__name');
let profileHobby = document.querySelector('.profile-info__profession');
let togglePopupState = (popupToToggle) => popupToToggle.classList.toggle('popup_opened');

function openPopup () {
    togglePopupState(popup);
    popupName.value = profileName.textContent; 
    popupHobby.value = profileHobby.textContent;
};

function fillForm(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileHobby.textContent = popupHobby.value; 
    togglePopupState(popup);
};

buttonPopupClose.addEventListener('click', () => togglePopupState(popup));
popupForm.addEventListener('submit', fillForm);
buttonPopupOpen.addEventListener('click', (openPopup));
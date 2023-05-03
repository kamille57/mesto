let popup = document.querySelector('.popup');
let buttonPopupOpen = document.querySelector('.profile-info__edit-button');
let buttonPopupClose = document.querySelector('.popup__closed');
let buttonSaveData = document.querySelector('.popup-form__save-button');

buttonPopupClose.addEventListener('click', () => {
popup.classList.remove('popup_opened');
});

let popupForm = document.querySelector('.popup-form');
let popupName = document.querySelector('.popup-item_name');
let popupHobby = document.querySelector('.popup-item_hobby');
let profileName = document.querySelector('.profile-info__name');
let profileHobby = document.querySelector('.profile-info__profession');

buttonPopupOpen.addEventListener('click', () => {
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent; 
    popupHobby.value = profileHobby.textContent;
});

popupForm.addEventListener('submit', fillForm);
function fillForm(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileHobby.textContent = popupHobby.value; 
    popup.classList.remove('popup_opened');
}










/*const buttonPopupOpen = document.querySelector('.profile__popup-open');
const popup = document.querySelector('.popup');
const buttonPopupClose = document.querySelector('.popup__closed');
const togglePopupState = () => popup.classList.toggle('popup__opened');

buttonPopupOpen.addEventListener('click', togglePopupState);
buttonPopupClose.addEventListener('click', togglePopupState);


popup.addEventListener('click', (evt) => {
    if (evt.target  === evt.currentTarget) {
        togglePopupState ()
}
});



let popupForm = document.querySelector('.popup-form');
let popupName = document.querySelector('.popup-item_name');
let popupHobby = document.querySelector('.popup-item_hobby');
let profileName = document.querySelector('.profile__name');
let profileHobby = document.querySelector('.profile__profession');

popupForm.addEventListener('submit', fillForm);

function fillForm() {
    fillForm.preventDefault()
    profileName.textContent = popupName.value;
    profileHobby.textContent = popupHobby.value; 
};*/

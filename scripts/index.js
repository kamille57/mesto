let popupEdit = document.querySelector('.popup_edit');
let popupAdd = document.querySelector('.popup_add')
let buttonPopupOpen = document.querySelector('.profile-info__edit-button');
let buttonCloseEdit = document.getElementById('closeButtonEdit');
let buttonCloseAdd = document.getElementById('closeButtonAdd');
let popupForm = document.querySelector('.popup-form');
let popupName = document.getElementById('name');
let popupHobby = document.getElementById('hobby');
let profileName = document.querySelector('.profile-info__name');
let profileHobby = document.querySelector('.profile-info__profession');
let togglePopupState = (popupToToggle) => popupToToggle.classList.toggle('popup_opened');
let imageAddButton = document.querySelector('.profile-info__add-button');
let toggleLikeState = document.querySelector('.element__like');

function openEditPopup () {
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

toggleLikeState.addEventListener('click', function(evt) {
    const eventTarget = evt.target;
    eventTarget.setAttribute('disabled', true);
}
);

imageAddButton.addEventListener('click', () => togglePopupState(popupAdd));
buttonPopupOpen.addEventListener('click', openEditPopup);
buttonCloseEdit.addEventListener('click', () => togglePopupState(popupEdit));
buttonCloseAdd.addEventListener('click', () => togglePopupState(popupAdd));
popupForm.addEventListener('submit', fillForm);

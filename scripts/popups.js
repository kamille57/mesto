function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handlePopupKeydown);
};

function showPicture(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupText.textContent = name;
    openPopup(popupElement);
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
};

function handlePopupCloseClick(event) { // функция закрытия окон на крестик
    const target = event.target;
    if (target.classList.contains('popup__closed')) {
        const popup = target.closest(popups);
        closePopup(popup);
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

buttonPopupOpen.addEventListener('click', openEditPopup);// edit button
addImageOpen.addEventListener('click', fillAddForm);// add button
popupFormEdit.addEventListener('submit', fillInfoForm);
popupFormAdd.addEventListener('submit', fillAddForm);

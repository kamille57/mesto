
const formSubmitButtonChangeState = (form) => {
    const button = document.querySelector('.popup-form__save-button');
    if (!form.checkValidity()) {
        button.setAttribute('disabled', true);
        button.classList.add('popup-form__save-button_invalid');
        button.classList.remove('popup-form__save-button_valid');
    } else {
        button.removeAttribute('disabled');
        button.classList.add('popup-form__save-button_valid');
        button.classList.remove('popup-form__save-button_invalid');

    }
};

const getErrorElement = (input) => {
    return document.querySelector(`#${input.id}-error`);
};

const hideError = (input) => {
    const errorElement = getErrorElement(input);
    errorElement.textContent = '';
    input.classList.remove('popup__input_error');

};

const showError = (input) => {
    const errorElement = getErrorElement(input);
    errorElement.textContent = input.validationMessage;
    input.classList.add('popup__input_error');
};

const validateInput = (input) => {
    if (!input.validity.valid) {
        showError(input);
    } else {
        hideError(input);
    }
};

const sendForm = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    if (!form.checkValidity()) {
        console.log('bad request');
    } else {
        console.log('good request');
    }

};

document.querySelectorAll('.popup-form').forEach((popupForm) => {
    popupForm.addEventListener('input', (evt) => {
        const input = evt.target;
        const form = evt.currentTarget;
        console.log(form);
        validateInput(input);
        formSubmitButtonChangeState(form)
    }, true);
    popupForm.addEventListener('submit', sendForm);
    formSubmitButtonChangeState(popupForm);
});

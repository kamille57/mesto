export class FormValidator {

    constructor(validationConfig, popupForm) {
        this._form = popupForm;
        this._validationConfig = validationConfig;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._validationConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.remove(this._validationConfig.errorInvalidClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._validationConfig.inputErrorClass);
        errorElement.classList.add(this._validationConfig.errorInvalidClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setEventListeners() {
        const inputList = Array.from(this._form.querySelectorAll(this._validationConfig.inputElement));
        const buttonElement = this._form.querySelector(this._validationConfig.submitButtonSelector);
        this._toggleButtonState(buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(buttonElement);
            });
        });
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(buttonElement) {
        const inputList = Array.from(this._form.querySelectorAll(this._validationConfig.inputElement));

        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._validationConfig.invalidButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._validationConfig.invalidButtonClass);
            buttonElement.disabled = false;
        }
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => evt.preventDefault());
        const fieldset = this._form.querySelector(this._validationConfig.fieldSetSelector);
        console.warn(fieldset);
        this._setEventListeners(fieldset);
    }

    resetFormValidation() {
        const inputList = Array.from(this._form.querySelectorAll(this._validationConfig.inputElement));
        const buttonElement = this._form.querySelector(this._validationConfig.submitButtonSelector);
        inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState(buttonElement);
    }
}

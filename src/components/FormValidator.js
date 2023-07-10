export default class FormValidator {

    constructor(validationConfig, popupForm) {
        this._form = popupForm;
        this._validationConfig = validationConfig;
        this._inputList = Array.from(this._form.querySelectorAll(this._validationConfig.inputElement));
        this._buttonElement = this._form.querySelector(this._validationConfig.submitButtonSelector);
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
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    
    _toggleButtonState() {
        if (this._hasInvalidInput()) { 
            this._buttonElement.classList.add(this._validationConfig.invalidButtonClass); 
            this._buttonElement.disabled = true; 
        } else { 
            this._buttonElement.classList.remove(this._validationConfig.invalidButtonClass); 
            this._buttonElement.disabled = false; 
        } 
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => evt.preventDefault());
        const fieldset = this._form.querySelector(this._validationConfig.fieldSetSelector);
        this._setEventListeners(fieldset);
    }

    resetFormValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    }
}

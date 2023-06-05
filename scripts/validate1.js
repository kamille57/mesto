const showInputError = (validationConfig, formElement, inputElement, errorMessage) => {  
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);  
  inputElement.classList.add(validationConfig.inputErrorClass);  
  errorElement.textContent = errorMessage;  
  errorElement.classList.remove(validationConfig.errorInvalidClass);  
};  
 
const hideInputError = (validationConfig, formElement, inputElement) => {  
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);  
  inputElement.classList.remove(validationConfig.inputErrorClass);  
  errorElement.classList.add(validationConfig.errorInvalidClass);  
  errorElement.textContent = '';  
};  
 
const checkInputValidity = (validationConfig, formElement, inputElement) => {  
  if (!inputElement.validity.valid) {  
    showInputError(validationConfig, formElement, inputElement, inputElement.validationMessage);  
  } else {  
    hideInputError(validationConfig, formElement, inputElement);  
  }  
};  
 
 
const setEventListeners = (validationConfig, formElement) => {  
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputElement));  
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);  
  toggleButtonState(validationConfig, formElement, buttonElement);  
  inputList.forEach((inputElement) => {  
    inputElement.addEventListener('input', function() {  
      checkInputValidity(validationConfig, formElement, inputElement);  
      toggleButtonState(validationConfig, formElement, buttonElement);  
    });  
  });  
};  
 
 
const hasInvalidInput = (inputList, validationConfig) => {  
  return inputList.some((inputElement) => {  
    return !inputElement.validity.valid;  
  }); 
};   
 
const toggleButtonState = (validationConfig, formElement, buttonElement) => {  
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputElement));
  
  if (hasInvalidInput(inputList, validationConfig)) {  
    buttonElement.classList.add(validationConfig.invalidButtonClass);  
    buttonElement.disabled = true;  
  } else {  
    buttonElement.classList.remove(validationConfig.invalidButtonClass);  
    buttonElement.disabled = false;  
  }  
};   
 
const enableValidation = (validationConfig) => {  
  const formList = Array.from(document.querySelectorAll(validationConfig.formElement));  
  formList.forEach((formElement) => {  
    formElement.addEventListener('submit', function(evt) {  
      evt.preventDefault();  
    });  
    const fieldsetList = Array.from(formElement.querySelectorAll(validationConfig.fieldSetSelector));  
    fieldsetList.forEach((fieldset) => {  
      setEventListeners(validationConfig, fieldset);  
    });  
  });  
};  
 
enableValidation({  
  formElement: '.popup-form',  
  inputElement: '.popup__input',  
  submitButtonSelector: '.popup-form__save-button',  
  invalidButtonClass: 'popup-form__save-button_invalid',  
  inputErrorClass: 'popup__input_error',  
  errorInvalidClass: 'error_invalid',  
  fieldSetSelector: '.popup-form__set'  
});
const formSubmitButtonChangeState = (validationConfig, formElement) => {
    const button = document.querySelector(validationConfig.submitButtonSelector);
    if (!formElement.checkValidity()) {
        button.setAttribute('disabled', true);
        button.classList.add(validationConfig.invalidButtonClass);
        button.classList.remove(validationConfig.validButtonClass);
    } else {
        button.removeAttribute('disabled');
        button.classList.add(validationConfig.validButtonClass);
        button.classList.remove(validationConfig.invalidButtonClass);
    }
    console.log(!formElement.checkInputValidity);
    console.log(button);
};

const showInputError = (validationConfig, inputElement) => { 
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage; 
    inputElement.classList.add(validationConfig.inputErrorClass); 
    
}; 
  
const hideInputError = (validationConfig, inputElement) => { 
    const errorElement = document.querySelector(`#${inputElement.id}-error`); 
    errorElement.textContent = ''; 
    inputElement.classList.remove(validationConfig.inputErrorClass); 
}; 
   
const checkInputValidity = (validationConfig, inputElement) => { 
    if (!inputElement.validity.valid) { 
        showInputError(validationConfig, inputElement); 
    } else { 
        hideInputError(validationConfig, inputElement); 
    } 
}; 

const setEventListeners = (validationConfig, formElement) => { 
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputElement)); 
    formSubmitButtonChangeState(validationConfig, formElement);
    inputList.forEach((inputElement) => { 
        inputElement.addEventListener('input', function () { 
            checkInputValidity(validationConfig, inputElement);
            formSubmitButtonChangeState(validationConfig, formElement);
        });
    }); 
}; 
 
const enableValidation = (validationConfig) => { 
    const formList = Array.from(document.querySelectorAll(validationConfig.formElement)); // ищем по всему документу формы
    formList.forEach((formElement) => { 
      formElement.addEventListener('submit', (evt) => { 
        evt.preventDefault(); 
        setEventListeners(validationConfig, formElement); 
      }); 
      setEventListeners(validationConfig, formElement); 
    }); 
  }; 

enableValidation({ 
    formElement: '.popup-form', 
    inputElement: '.popup__input', 
    submitButtonSelector: '.popup-form__save-button', 
    invalidButtonClass: 'popup-form__save-button_invalid', 
    validButtonClass: 'popup-form__save-button_valid', 
    inputErrorClass: 'popup__input_error', 
  });  
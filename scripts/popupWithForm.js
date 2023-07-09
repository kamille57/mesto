import { Popup } from './popup.js';

export class PopupWithForm extends Popup {
    constructor(templateSelector, handleFormSubmit) {
      super(templateSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._form = this._popup.querySelector('.popup-form');
    }
  
    _getInputValues() {
      const inputList = Array.from(this._form.querySelectorAll('.popup__input'));
      const formValues = {};
      inputList.forEach((input) => {
        formValues[input.name] = input.value;
      });
      console.log(formValues);
      return formValues;
    }
  
    setEventListeners() {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    }
  }
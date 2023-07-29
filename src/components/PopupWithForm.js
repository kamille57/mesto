import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor(templateSelector, handleFormSubmit) {
    super(templateSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup-form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitButton = this._popup.querySelector('.popup-form__save-button');
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners(); 
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setLoading() {
    this._submitButton.textContent = 'Сохранение...';
  }

  unsetLoading() {
    this._submitButton.textContent = text;
  }

}
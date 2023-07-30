import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor(templateSelector, handleFormSubmit) {
    super(templateSelector);
    this._form = this._popup.querySelector('.popup-form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitButton = this._popup.querySelector('.popup-form__save-button');
    this._defaultSubmitText = this._submitButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
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

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._defaultSubmitText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }

}
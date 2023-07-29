import Popup from '../components/Popup.js';

export default class PopupConfirm extends Popup {
  constructor(templateSelector, callbackDeleteSubmit) {
    super(templateSelector);
    this._callbackDeleteSubmit = callbackDeleteSubmit;
    this._submitButton = this._popup.querySelector('.popup-form__save-button');
  }

  setConfirmCallback(confirmCallback) {
    this._confirmCallback = confirmCallback;
  }

  _handleConfirm() {
    if (this._confirmCallback) {
      this._confirmCallback();
    }
    this.close();
  }

  setLoading() {
    this._submitButton.value = 'Сохранение...';
  }

  unsetLoading(text) {
    this._submitButton.value = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleConfirm();
    });
  }

  open(deleteCardCallback) {
    this._confirmCallback = deleteCardCallback;
    super.open();
  }
}
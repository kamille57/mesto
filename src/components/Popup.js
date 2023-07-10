export default class Popup {

    constructor(templateSelector) { 
        this._templateSelector = templateSelector; 
        this._handleEscClose = this._handleEscClose.bind(this); 
        this._handleOverlayClose = this._handleOverlayClose.bind(this); 
        this._popup = document.querySelector(templateSelector); // определение this._popup
        this._button = this._popup.querySelector('.popup__closed'); 
         
        this._setEventListeners(); 
    }
    
    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }
    
    _handleOverlayClose(event) {
        if (event.target === event.currentTarget) {
            this.close();
        }
    }
    
    _setEventListeners() {
        this._button.addEventListener('click', this.close.bind(this)); 
        this._popup.addEventListener('mousedown', this._handleOverlayClose); 
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
}
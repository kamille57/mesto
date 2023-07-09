import { Popup } from './popup.js';

export class PopupWithImage extends Popup { 
    constructor(popup) { 
        super(popup);
      this._pic = this._popup.querySelector('.popup__pic');
      this._text = this._popup.querySelector('.popup__text'); 
    } 
  
    open(link, name) { 
      super.open(); 
      console.log(this._pic);
      this._pic.src = link; 
      this._pic.alt = name; 
      this._text.textContent = name; 
    }
  } 
 
import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popup){
    super(popup);
    this._image = this._popup.querySelector('.popup__image');
    this._text = this._popup.querySelector('.popup__text');
  }
  open(evt){
    super.open();
    this._image.src = evt.target.src;
    this._image.alt = evt.target.alt;
    this._text.textContent = evt.target.alt;
  }
}
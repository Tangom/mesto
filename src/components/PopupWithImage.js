import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._text = this._popup.querySelector('.popup__text');
  }

  open(item) {
    super.open();
    this._image.src = item.link;
    this._image.alt = item.name;
    this._text.textContent = item.name;
  }
}
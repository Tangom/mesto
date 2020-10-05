export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closePopupOverlay = this._closePopupOverlay.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._addListener();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._removeListener();
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener('click', () => {
      this.close()
    });
  }

  _addListener() {
    this._popup.addEventListener('click', this._closePopupOverlay);
    document.addEventListener('keyup', this._handleEscClose);
  }

  _removeListener() {
    this._popup.removeEventListener('click', this._closePopupOverlay);
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _closePopupOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }
}

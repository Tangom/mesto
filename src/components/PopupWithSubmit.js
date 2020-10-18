import {Popup} from './Popup.js';

export class PopupWithSubmit extends Popup {
  constructor({popupSelector, submitForm}) {
    super(popupSelector);
    this._submitForm = submitForm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._item);
    })
  }

  open(item) {
    super.open();
    this._item = item;
  }


  waitLoading(waiting) {
    if (waiting) {
      this._popup.querySelector('.popup__save').textContent = 'Удаление...';
    } else {
      this._popup.querySelector('.popup__save').textContent = 'Да';
    }
  }

}
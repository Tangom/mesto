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

  open(data) {
    super.open();
    this._data = data;
  }

}
import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({popupSelector, submitForm}) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._textSaveButtion = this._popup.querySelector('.popup__save').textContent
  }

  _getInputValues() {
    const inputValues = {};
    const inputList = Array.from(this._popup.querySelectorAll('.popup__field'));
    inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }

  loading(waiting) {
    if (waiting) {
      this._textSaveButtion = 'Сохранение...';
    } else {
      this._textSaveButtion = this._textSaveButtion;
    }
  }
}
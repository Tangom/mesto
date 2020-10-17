import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({popupSelector, submitForm}) {
    super(popupSelector);
    this._submitForm = submitForm;
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

  // open(data = null) {
  //   if (data != null) {
  //     const inputList =  Array.from(this._popup.querySelectorAll(listSelector.inputSelector));
  //     inputList.forEach( input => {
  //       input.value = data[input.name];
  //     })
  //   }
  //   super.open();
  // }


  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }

  loading(waiting) {
    if (waiting) {
      this._popup.querySelector('.popup__save').textContent = 'Сохранение...';
    } else {
      this._popup.querySelector('.popup__save').textContent = 'Сохранить...';
    }
  }
}
import {openPopupImage} from "./index.js";

export class Card{
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
  }

  _getTemplate(){
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard(){
    this._element = this._getTemplate();
    const image = this._element.querySelector('.element__image');
    const text = this._element.querySelector('.element__text');
    image.src = this._link;
    image.alt = this._name;
    text.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  //   openImage(make){
  //   this._element.querySelector('.element__image').addEventListener('click', make)
  // }

  _setEventListeners(){
    this._element.querySelector('.element__like').addEventListener('click', this._makeLike);
    this._element.querySelector('.element__image').addEventListener('click', openPopupImage);
    this._element.querySelector('.element__deleted').addEventListener('click', evt => {
      evt.target.closest('.element').remove();
    })
  }

  _makeLike(evt){
    evt.target.classList.toggle('element__like_active');
  }
}




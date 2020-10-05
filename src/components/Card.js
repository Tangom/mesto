export class Card {
  constructor({data, handleCardClick}, cardSelector) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const image = this._element.querySelector('.element__image');
    const text = this._element.querySelector('.element__text');
    image.src = this._link;
    image.alt = this._name;
    text.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }

  _makeLike(evt) {
    evt.target.classList.toggle('element__like_active');
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', this._makeLike);
    this._element.querySelector('.element__deleted').addEventListener('click', evt => {
      evt.target.closest('.element').remove()
    });
    this._element.querySelector('.element__image').addEventListener("click", () => {
      this._handleCardClick({name: this._name, link: this._link})
    });
  }
}




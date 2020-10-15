export class Card {
  constructor({data, handleCardClick, handleDeleteCard, handleLikeClick, id}, cardSelector) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard.bind(this);
    this._handleLikeClick = handleLikeClick.bind(this);
    this._likes = data.likes;
    this._owner = data.owner._id;
    this._myId = id;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._count = this._element.querySelector('.element__result');
    this._elementLike = this._element.querySelector('.element__like');
    const image = this._element.querySelector('.element__image');
    const text = this._element.querySelector('.element__text');
    const deleted = this._element.querySelector('.element__deleted');
    image.src = this._link;
    image.alt = this._name;
    text.textContent = this._name;

    if (this._owner !== this._myId) {
      deleted.classList.add('element__deleted_disable');
    }

    if (this.myLike()) {
      this._elementLike.classList.add("'element__like_active'");
    }

    this._setEventListeners();
    return this._element;
  }

  countLike(data) {
    this._count.textContent = String(data.likes.length);
    this._likeToggle();
  }

  _likeToggle() {
    this._elementLike.classList.toggle('element__like_active')
  }

  myLike() {
    return this._likes.find((like) => {
      if (like._id === this._myId) {
        return true
      } else {
        return false
      }
    })
  }

  makeDelete() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', this._handleLikeClick(this));
    this._element.querySelector('.element__deleted').addEventListener('click', this._handleDeleteCard(this));
    this._element.querySelector('.element__image').addEventListener("click", () => {
      this._handleCardClick({name: this._name, link: this._link})
    });
  }

}




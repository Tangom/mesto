export class Card {
  constructor({data, handleCardClick, handleDeleteCard, handleLikeClick, myId}, cardSelector) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard.bind(this);
    this._handleLikeClick = handleLikeClick;
    this._likes = data.likes.length;
    this._liked = data.likes.some((like) => {
      return like._id === myId;
    })
    this._myId = myId;
    this._myId = data.owner._id === myId;
    this._id = data._id;
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
    this._image = this._element.querySelector('.element__image');
    this._text = this._element.querySelector('.element__text');
    this._deleted = this._element.querySelector('.element__deleted');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._text.textContent = this._name;
    this._count.textContent = this._likes.length;

    if (!this._myId) {
      this._deleted.classList.add('element__deleted_disable');
    }

    this._likeToggle();
    this._setEventListeners();
    return this._element;
  }

  countLike(data) {
    this._likes = data.likes.length;
    this._liked = !this._liked;
    this._likeToggle();
  }

  _likeToggle() {
    this._count.textContent = this._likes;
    if (this._liked) {
      this._elementLike.classList.add('element__like_active');
    } else {
      this._elementLike.classList.remove('element__like_active');
    }
  }

  myLike() {
    return this._liked;
  }

  makeDelete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => this._handleLikeClick(this));
    this._deleted.addEventListener('click', () => this._handleDeleteCard(this));
    this._image.addEventListener("click", () => {
      this._handleCardClick({name: this._name, link: this._link})
    });
  }

}




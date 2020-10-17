export class Card {
  constructor({data, handleCardClick, handleDeleteCard, handleLikeClick, myId}, cardSelector) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard.bind(this);
    this._handleLikeClick = handleLikeClick.bind(this);
    // this._owner = data.owner._id;
    this._likes = data.likes;
    // this._liked = data.likes.some((like) => {
    //   return like._id === myId;
    // })
    // this._myId = myId;
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
    const image = this._element.querySelector('.element__image');
    const text = this._element.querySelector('.element__text');
    const deleted = this._element.querySelector('.element__deleted');
    image.src = this._link;
    image.alt = this._name;
    text.textContent = this._name;
    this._count.textContent = this._likes.length;

       if (!this._myId) {
      deleted.classList.add('element__deleted_disable');
    }

    this._likeToggle();
    this._setEventListeners();
    return this._element;
  }

  // countLike(data) {
  //   this._likes = data.likes.length;
  //   this._liked = !this._liked;
  //   this._likeToggle();
  // }
  //
  // _likeToggle() {
  //   this._count.textContent = this._likes;
  //   if (this._liked) {
  //     this._elementLike.classList.add('element__like_active');
  //   } else {
  //     this._elementLike.classList.remove('element__like_active');
  //   }
  // }
  //
  // myLike() {
  //   return this._liked;
  // }

  //
  // countLike(data) {
  //   this._likes.length = data.likes.length
  //   this.myLike() === !this.myLike();
  //   this._likeToggle();
  //     }
  //
  countLike(data) {
    this._count.textContent = String(data.likes.length);
    this._likeToggle();
  }

  _likeToggle() {
    this._count.textContent = this._likes.length;
      if (this.myLike()) {
        this._elementLike.classList.add('element__like_active');
      } else {
        this._elementLike.classList.remove('element__like_active');
      }
    }

  myLike() {
    return this._likes.find((like) => {
      if (like._id === this._myId) {
        return true
      }
      return false
    })
  }

  makeDelete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', this._handleLikeClick(this));
    this._element.querySelector('.element__deleted').addEventListener('click', this._handleDeleteCard(this));
    this._element.querySelector('.element__image').addEventListener("click", () => {
      this._handleCardClick({name: this._name, link: this._link})
    });
  }

}




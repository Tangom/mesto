import './index.css';
import {Section} from '../components/Section.js';
import {Card} from '../components/Card.js';
import {UserInfo} from '../components/UserInfo.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithSubmit} from '../components/PopupWithSubmit.js';
import {Api} from '../components/Api.js';

const profile = document.querySelector('.profile');
const popupOpenProfile = profile.querySelector('.profile__edit');
const popupOpenCard = profile.querySelector('.profile__add-image');
const popupEditAvatar = profile.querySelector('.profile__edit-image');

const popupAvatar = document.querySelector('.popup_avatar');
const popupConfirm = document.querySelector('.popup_confirm');
const popupCard = document.querySelector('.popup_card');
const popupProfile = document.querySelector('.popup_profile');
const popupName = popupProfile.querySelector('.popup__field_name');
const popupCareer = popupProfile.querySelector('.popup__field_career');

const elements = ('.elements');
const profileName = ('.profile__name-field');
const profileAvatar = ('.profile__image');
const profileCareer = ('.profile__career-field');
const popupProfileSelector = ('.popup_profile');
const popupAvatarSelector = ('.popup_avatar');
const popupCardSelector = ('.popup_card');
const popupPhoto = ('.popup_photo');

import SanDiego from '../images/SanDiego,UnitedStates.jpg';
import PortWaikato from '../images/PortWaikato,NewZealand.jpg' ;
import Hrensko from '../images/Hřensko,Czechia.jpg';
import Skye from '../images/Skye,UnitedKingdom.jpg';
import Vernazza from '../images/Vernazza,Italy.jpg';
import Puntarenas from '../images/Puntarenas,CostaRica.jpg';

const cards = [{
  name: 'Сан-Диего',
  link: SanDiego
},
  {
    name: 'Уаикато',
    link: PortWaikato
  },
  {
    name: 'Грженско',
    link: Hrensko
  },
  {
    name: 'Айл-оф-Скай',
    link: Skye
  },
  {
    name: 'Вернацца',
    link: Vernazza
  },
  {
    name: 'Пунтаренас',
    link: Puntarenas
  }
]

const listSelector = {
  formSelector: '.popup__form',
  formSetSelector: '.popup__form-set',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__field_error',
  errorClass: 'popup__form-error_active'
};
let id = '';
const photo = new PopupWithImage(popupPhoto);
const user = new UserInfo(profileName, profileCareer, profileAvatar);
const handleCardClick = (data) => photo.open(data);
const handleDeleteCard = (data) => popupSubmit.open(data);
const handleLikeClick = (data) => {
  if (data.myLike()) {
    api.deleteLike(data)
      .then((item) => {
        data.countLike(item);
      })
  } else {
    api.putLikeCard(data)
      .then((item) => {
        data.countLike(item);
      })
  }
}

const card = (data) => new Card({data, handleCardClick, handleDeleteCard, handleLikeClick, id}, '.template');
const validator = (popup) => new FormValidator(listSelector, popup.querySelector(listSelector.formSelector));
const cardValidator = validator(popupCard);
const profileValidator = validator(popupProfile);
const avatarValidator = validator(popupAvatar);

cardValidator.enableValidation();
profileValidator.enableValidation();
avatarValidator.enableValidation();

function createCard(data) {
  return card(data).generateCard();
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'ee9064d2-31dc-4f39-a99f-b246f99cc62c',
    'Content-Type': 'application/json'
  }
});

api.getAllData()
  .then(data => {
    const [userData, cards] = data;
    id = userData._id;
    user.setUserInfo(userData);
    section.renderItems();
  })

const section = new Section({
  items: cards,
  renderer: (data) => {
    section.addItem(createCard(data));
  }
}, elements);

section.renderItems();

const popupSubmit = new PopupWithSubmit({
  popupSelector: popupConfirm,
  submitForm: (data) => {
    api.deleteCard(data)
      .then(() => {
        data.makeDelete();
      })
      .finally(() => {
        popupSubmit.close();
      })
  }
});

const popupAvatarForm = new PopupWithForm({
  popupSelector: popupAvatarSelector,
  submitForm: (data) => {
    popupAvatarForm.loading(true);
    api.patchUserAvatar(data)
      .then((res) => {
        user.setUserInfo(res);
      })
      .finally(() => {
        popupAvatarForm.loading(false);
        popupAvatarForm.close();
      })
  }
});

const popupProfileForm = new PopupWithForm({
  popupSelector: popupProfileSelector,
  submitForm: (data) => {
    popupProfileForm.loading(true);
    api.patchProfileEditing(data)
      .then((res) => {
        user.setUserInfo(res);
      })
      .finally(() => {
        popupProfileForm.loading(false);
        popupProfileForm.close();
      })
  }
});

const popupCardForm = new PopupWithForm({
  popupSelector: popupCardSelector,
  submitForm: (data) => {
    popupCardForm.loading(true);
    api.postAddCard(data)
      .then((data) => {
        section.addItem((createCard(data)), false);
      })
      .finally(() => {
        popupCardForm.loading(false);
        popupCardForm.close();
      })
  }
});

popupProfileForm.setEventListeners();
popupCardForm.setEventListeners();
popupSubmit.setEventListeners();
photo.setEventListeners();
popupEditAvatar.setEventListeners();

popupOpenProfile.addEventListener('click', () => {
  const userInfo = user.getUserInfo();
  popupName.value = userInfo.name;
  popupCareer.value = userInfo.info;
  popupProfileForm.open();
  profileValidator.reset();
});

popupOpenCard.addEventListener('click', () => {
  popupCardForm.open();
  cardValidator.reset();
});

popupEditAvatar.addEventListener('click', () => {
  popupAvatarForm.open();
  avatarValidator.reset();
});
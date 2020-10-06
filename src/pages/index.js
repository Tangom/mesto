import './index.css';
import {Section} from '../components/Section.js';
import {Card} from '../components/Card.js';
import {UserInfo} from '../components/UserInfo.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';

const profile = document.querySelector('.profile');
const popupOpenProfile = profile.querySelector('.profile__edit');
const popupOpenCard = profile.querySelector('.profile__add-image');

const popupCard = document.querySelector('.popup_card');
const popupProfile = document.querySelector('.popup_profile');
const popupName = popupProfile.querySelector('.popup__field_name');
const popupCareer = popupProfile.querySelector('.popup__field_career');

const elements = ('.elements');
const profileName = ('.profile__name-field');
const profileCareer = ('.profile__career-field');
const popupProfileSelector = ('.popup_profile');
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

const photo = new PopupWithImage(popupPhoto);
const user = new UserInfo(profileName, profileCareer);
const handleCardClick = (item) => photo.open(item);

const card = (data) => new Card({data, handleCardClick}, '.template');
const validator = (popup) => new FormValidator(listSelector, popup.querySelector(listSelector.formSelector));
const cardValidator = validator(popupCard);
const profileValidator = validator(popupProfile);

cardValidator.enableValidation();
profileValidator.enableValidation();

function createCard(name, link) {
  return card({name: name, link: link}).generateCard();
}

const section = new Section({
  items: cards,
  renderer: (item) => {
    section.addItem(createCard(item.name, item.link));
  }
}, elements);

section.renderItems();

const popupProfileForm = new PopupWithForm({
  popupSelector: popupProfileSelector,
  submitForm: (data) => {
    user.setUserInfo(data);
    popupProfileForm.close();
  }
});

const popupCardForm = new PopupWithForm({
  popupSelector: popupCardSelector,
  submitForm: (item) => {
    section.addItem((createCard(item.place, item.link)), false);
    popupCardForm.close();
  }
});

popupProfileForm.setEventListeners();
popupCardForm.setEventListeners();
photo.setEventListeners();

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

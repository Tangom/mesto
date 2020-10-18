// import SanDiego from '../images/SanDiego,UnitedStates.jpg';
// import PortWaikato from '../images/PortWaikato,NewZealand.jpg' ;
// import Hrensko from '../images/Hřensko,Czechia.jpg';
// import Skye from '../images/Skye,UnitedKingdom.jpg';
// import Vernazza from '../images/Vernazza,Italy.jpg';
// import Puntarenas from '../images/Puntarenas,CostaRica.jpg';
//
// const cards = [{
//   name: 'Сан-Диего',
//   link: SanDiego
// },
//   {
//     name: 'Уаикато',
//     link: PortWaikato
//   },
//   {
//     name: 'Грженско',
//     link: Hrensko
//   },
//   {
//     name: 'Айл-оф-Скай',
//     link: Skye
//   },
//   {
//     name: 'Вернацца',
//     link: Vernazza
//   },
//   {
//     name: 'Пунтаренас',
//     link: Puntarenas
//   }
// ]

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
const popupEditAvatar = profile.querySelector('.profile__avatar-image');

const popupAvatar = document.querySelector('.popup_avatar');
const popupCard = document.querySelector('.popup_card');
const popupProfile = document.querySelector('.popup_profile');
const popupName = document.querySelector('.popup__field_name');
const popupCareer = document.querySelector('.popup__field_career');

const elements = ('.elements');
const profileName = ('.profile__name-field');
const profileAvatar = ('.profile__avatar');
const profileCareer = ('.profile__career-field');
const popupProfileSelector = ('.popup_profile');
const popupAvatarSelector = ('.popup_avatar');
const popupCardSelector = ('.popup_card');
const popupConfirmSelector = ('.popup_confirm');
const popupPhoto = ('.popup_photo')

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
const user = new UserInfo(profileName, profileCareer, profileAvatar);

function createCard(data, myId) {
  const newCard = new Card({
    data,
    handleCardClick: (data) => photo.open(data),
    handleDeleteCard: (data) => popupSubmit.open(data),
    handleLikeClick: (data) => {
      if (data.makeMyLike()) {
        api.deleteLike(data)
          .then((item) => {
            data.countLike(item);
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        api.putLikeCard(data)
          .then((item) => {
            data.countLike(item);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    },
    myId
  }, '.template');

  return newCard.generateCard();
}


const cardValidator = new FormValidator(listSelector, popupCard.querySelector(listSelector.formSelector));
const profileValidator = new FormValidator(listSelector, popupProfile.querySelector(listSelector.formSelector));
const avatarValidator = new FormValidator(listSelector, popupAvatar.querySelector(listSelector.formSelector));

cardValidator.enableValidation();
profileValidator.enableValidation();
avatarValidator.enableValidation();


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'ee9064d2-31dc-4f39-a99f-b246f99cc62c',
    'Content-Type': 'application/json'
  }
});

api.getAllData()
  .then(data => {
    const [profile, cards] = data;
    const myId = profile._id;
    user.setUserInfo(profile);
    user.setUserAvatar(profile);

    const section = new Section({
      items: cards,
      renderer: (data) => {
        section.addItem(createCard(data, myId));
      }
    }, elements);

    section.renderItems();

    const popupCardForm = new PopupWithForm({
      popupSelector: popupCardSelector,
      submitForm: (item) => {
        popupCardForm.waitLoading(true);
        api.postAddCard({
          name: item.place,
          link: item.link
        })
          .then((item) => {
            section.addItem((createCard(item, myId)), false);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            popupCardForm.waitLoading(false);
            popupCardForm.close();
          })
      }
    });

    popupOpenCard.addEventListener('click', () => {
      popupCardForm.open();
      cardValidator.reset();
    });

    popupCardForm.setEventListeners();

  })

const popupSubmit = new PopupWithSubmit({
  popupSelector: popupConfirmSelector,
  submitForm: (data) => {
    popupSubmit.waitLoading(true)
    api.deleteCard(data)
      .then(() => {
        data.makeDelete();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupSubmit.waitLoading(false)
        popupSubmit.close();
      })
  }
});

const popupAvatarForm = new PopupWithForm({
  popupSelector: popupAvatarSelector,
  submitForm: (data) => {
    popupAvatarForm.waitLoading(true);
    api.patchUserAvatar(data)
      .then(() => {
        user.setUserAvatar(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatarForm.waitLoading(false);
        popupAvatarForm.close();
      })
  }
});

const popupProfileForm = new PopupWithForm({
  popupSelector: popupProfileSelector,
  submitForm: (data) => {
    popupProfileForm.waitLoading(true);
    api.patchProfileEditing(data)
      .then((res) => {
        user.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupProfileForm.waitLoading(false);
        popupProfileForm.close();
      })
  }
});

popupProfileForm.setEventListeners();
popupSubmit.setEventListeners();
photo.setEventListeners();
popupAvatarForm.setEventListeners();

popupOpenProfile.addEventListener('click', () => {
  const userInfo = user.getUserInfo();
  popupName.value = userInfo.name;
  popupCareer.value = userInfo.about;
  popupProfileForm.open(userInfo);
  profileValidator.reset();
});

popupEditAvatar.addEventListener('click', () => {
  popupAvatarForm.open();
  avatarValidator.reset();
});
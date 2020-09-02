const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupCloseProfile = popupProfile.querySelector('.popup__close_profile');
const popupName = popupProfile.querySelector('.popup__field_name');
const popupCareer = popupProfile.querySelector('.popup__field_career');
const popupFormProfile = popupProfile.querySelector('.popup__form_profile');

const popupCard = document.querySelector('.popup_card');
const popupCloseCard = popupCard.querySelector('.popup__close_card');
const popupPlace = popupCard.querySelector('.popup__field_place');
const popupLink = popupCard.querySelector('.popup__field_link');
const popupFormCard = popupCard.querySelector('.popup__form_card');

const popupPhoto = document.querySelector('.popup_photo');
const popupCloseImage = popupPhoto.querySelector('.popup__close_image');
const popupText = popupPhoto.querySelector('.popup__text');
const popupImage = popupPhoto.querySelector('.popup__image');

const profile = document.querySelector('.profile');
const popupOpenProfile = profile.querySelector('.profile__edit');
const popupOpenCard = profile.querySelector('.profile__add-image');
const profileName = profile.querySelector('.profile__name-field');
const profileCareer = profile.querySelector('.profile__career-field');

const elements = document.querySelector('.elements');

const cards = [{
    name: 'Сан-Диего',
    link: './images/SanDiego,UnitedStates.jpg'
  },
  {
    name: 'Уаикато',
    link: './images/PortWaikato,NewZealand.jpg'
  },
  {
    name: 'Грженско',
    link: './images/Hřensko,Czechia.jpg'
  },
  {
    name: 'Айл-оф-Скай',
    link: './images/Skye,UnitedKingdom.jpg'
  },
  {
    name: 'Вернацца',
    link: './images/Vernazza,Italy.jpg'
  },
  {
    name: 'Пунтаренас',
    link: './images/Puntarenas,CostaRica.jpg'
  }
]

function openPopup(mod) {
  mod.classList.add('popup_opened')
  addListener(mod);
}

function closePopup(mod) {
  mod.classList.remove('popup_opened')
  removeListener(mod);
}

function removeListener(mod) {
  mod.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEsc);
}

function addListener(mod) {
  mod.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupEsc);
}

function makeLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

function createElement(link, name) {
  const template = document.querySelector('.template').content;
  const element = template.cloneNode(true);
  const image = element.querySelector('.element__image')
  const text = element.querySelector('.element__text')

  image.src = link;
  image.alt = name
  text.textContent = name;

  image.addEventListener('click', openPopupImage);
  element.querySelector('.element__like').addEventListener('click', makeLike);
  element.querySelector('.element__deleted').addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });
  return element;
}

function openPopupImage(evt) {
  openPopup(popupPhoto);
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupText.textContent = evt.target.alt;
}

function openPopupProfile() {
  openPopup(popupProfile);
  popupName.value = profileName.textContent;
  popupCareer.value = profileCareer.textContent;
  checkOpenPopup(popupProfile);
}

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileCareer.textContent = popupCareer.value;
  closePopup(popupProfile);
}

function openPopupCard() {
  openPopup(popupCard);
  popupLink.value = '';
  popupPlace.value = '';
  checkOpenPopup(popupCard);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function addCard(evt) {
  evt.preventDefault();
  elements.prepend(createElement(popupLink.value, popupPlace.value));
  closePopup(popupCard);
}

function addElements() {
  cards.forEach(element => {
    elements.append(createElement(element.link, element.name));
  })
}

popupOpenProfile.addEventListener('click', openPopupProfile);
popupCloseProfile.addEventListener('click', () => closePopup(popupProfile));
popupOpenCard.addEventListener('click', openPopupCard);
popupCloseCard.addEventListener('click', () => closePopup(popupCard));
popupCloseImage.addEventListener('click', () => closePopup(popupPhoto));
popupFormProfile.addEventListener('submit', editProfile);
popupFormCard.addEventListener('submit', addCard);

addElements();

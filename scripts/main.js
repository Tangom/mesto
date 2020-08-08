let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');
let popupName = popup.querySelector('.popup__name-field');
let popupCareer = popup.querySelector('.popup__career-field');
let popupForm = popup.querySelector('.popup__form');

let profile = document.querySelector('.profile');
let popupOpen = profile.querySelector('.profile__edit');
let profileName = profile.querySelector('.profile__name-field');
let profileCareer = profile.querySelector('.profile__career-field');

function PopupToggle() {
  popupName.value = profileName.textContent;
  popupCareer.value = profileCareer.textContent;
  popup.classList.toggle('popup_opened');
}

function EditProfile(e) {
  e.preventDefault();
  profileName.textContent = popupName.value;
  profileCareer.textContent = popupCareer.value;
  PopupToggle();
}

popupOpen.addEventListener('click', PopupToggle);
popupClose.addEventListener('click', PopupToggle);
popupForm.addEventListener('submit', EditProfile);

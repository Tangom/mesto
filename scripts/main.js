let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');
let popupName = popup.querySelector('.popup__field_name');
let popupCareer = popup.querySelector('.popup__field_career');
let popupForm = popup.querySelector('.popup__form');

let profile = document.querySelector('.profile');
let popupOpen = profile.querySelector('.profile__edit');
let profileName = profile.querySelector('.profile__name-field');
let profileCareer = profile.querySelector('.profile__career-field');

function popupToggle() {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened')
  } else {
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupCareer.value = profileCareer.textContent;
  }
}

function editProfile(e) {
  e.preventDefault();
  profileName.textContent = popupName.value;
  profileCareer.textContent = popupCareer.value;
  popupToggle();
}

popupOpen.addEventListener('click', popupToggle);
popupClose.addEventListener('click', popupToggle);
popupForm.addEventListener('submit', editProfile);

const listSelector = {
  formSelector: '.popup__form',
  formSetSelector: '.popup__form-set',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__field_error',
  errorClass: 'popup__form-error_active'
};
//Показали ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(listSelector.inputErrorClass);
  errorElement.classList.add(listSelector.errorClass);
  errorElement.textContent = errorMessage;
};
//Убрали ошибку
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(listSelector.inputErrorClass);
  errorElement.classList.remove(listSelector.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
// Проверяем заполнение всех полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
//Она отключает и включает кнопку
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(listSelector.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(listSelector.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}
//Проверка при открытии окна
const checkOpenPopup = (mod => {
  const formElement = mod.querySelector(listSelector.formSelector);
  if (formElement != null) {
    const inputList = Array.from(formElement.querySelectorAll(listSelector.inputSelector));
    const buttonElement = formElement.querySelector(listSelector.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement);
    })
  }
})

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(listSelector.inputSelector));
  const buttonElement = formElement.querySelector(listSelector.submitButtonSelector);
  // Чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    // inputElement.addEventListener('input', inputEventListener)
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement)
      // Чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (Object) => {
  const formList = Array.from(document.querySelectorAll(Object.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(Object.formSetSelector));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};

enableValidation(listSelector );

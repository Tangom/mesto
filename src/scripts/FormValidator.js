export class FormValidator {
  constructor(listSelector, formElement) {
    this._formElement = formElement;
    this._formSelector = listSelector.formSelector;
    this._inputSelector = listSelector.inputSelector;
    this._submitButtonSelector = listSelector.submitButtonSelector;
    this._inactiveButtonClass = listSelector.inactiveButtonClass;
    this._inputErrorClass = listSelector.inputErrorClass;
    this._errorClass = listSelector.errorClass;
  }

  //Показали ошибку
  _showInputError(inputElement, errorMessage){
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };

  //Убрали ошибку
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  // Проверяем заполнение всех полей
  _hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  //Она отключает и включает кнопку
  _toggleButtonState(inputList, buttonElement){
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners(){
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    // Чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        if (this._formElement != null) {
          this._hideInputError(inputElement)
        }
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          // Чтобы проверять его при изменении любого из полей
          this._toggleButtonState(inputList, buttonElement);
        });
      }
    );
  }

  enableValidation(){
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}


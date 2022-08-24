// класс валидации формы и экспорт его содержимого
export default class FormValidator {
  // конструктор валидатора
  constructor(objValidation, formItem) {
    this._formSelector = objValidation.formSelector;
    this._inputSelector = objValidation.inputSelector;
    this._submitButtonSelector = objValidation.submitButtonSelector;
    this._inactiveButtonClass = objValidation.inactiveButtonClass;
    this._inputErrorClass = objValidation.inputErrorClass;
    this._errorClass = objValidation.errorClass;
    this._formItem = formItem;
  }

  // метод показывающий сообщение об ошибке в поле импута
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };

  // метод скрывающий сообщение об ошибке в поле импута
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // метод проверяющий нужно ли показывать или скрыть сообщение об ошибке
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  // метод проверяющий есть ли ошибка хотя бы в одном из полей
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // метод отключающий кнопку отправки формы
  disableButtonState(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  }

  // метод включающий кнопку отправки формы
  enableButtonState(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }

  // метод управляющий поведением кнопки отправки формы
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this.disableButtonState(buttonElement);
    } else {
      this.enableButtonState(buttonElement);
    }
  };

  // метод для установки слушателей в полях формы
  _setEventListener(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  // метод запускающий валидацию
  enableValidation() {
    this._formItem.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListener(this._formItem);
  };
}














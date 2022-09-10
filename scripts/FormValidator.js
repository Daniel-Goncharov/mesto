// класс валидации формы - настраивает валидацию полей формы
export default class FormValidator {
  // конструктор валидатора
  constructor({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  }, formEl) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._formEl = formEl;
  }

  // метод показывающий сообщение об ошибке в поле импута
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  // метод скрывающий сообщение об ошибке в поле импута
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // метод проверяющий нужно ли показывать или скрыть сообщение об ошибке
  _checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(formElement, inputElement);
    } else {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    }
  }

  // метод проверяющий есть ли ошибка хотя бы в одном из полей
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
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
  }

  // метод блокирующий кнопку submit после отправки формы
  _disableSubmitButton(nameForm) {
    const buttonAddCard = nameForm.querySelector(this._submitButtonSelector);
    buttonAddCard.classList.add(this._inactiveButtonClass);
    buttonAddCard.setAttribute("disabled", "disabled");
  }

  // метод для установки слушателей в полях формы
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', _ => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  // метод запускающий валидацию
  enableValidation() {
    this._formEl.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners(this._formEl);
  };
}














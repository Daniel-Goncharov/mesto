// импорт класса попап
import Popup from './Popup.js';
// импорт селекторов
import { selectors } from './constants.js';

// класс попапа с формой - добавляет классу попап методы по сбору данных из полей импута и их обработке и наследует часть методов от класса попап и экспорт его содержимого
export default class PopupWithForm extends Popup {
  // конструктор класса попап с формой
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  // метод открытия попапа с фомой наследуюмый от попапа
  openPopup() {
    super.openPopup();
    this._resetForm();
  }

  // метод закрытия попапа с фомой наследуюмый от попапа и очищающий поля формы
  closePopup() {
    super.closePopup();
    if (this._popup.matches(selectors.popupCard)) {
      this._popup.querySelector(selectors.formCard).reset();
    }
  }

  // метод очищающий поля форм от сообщений об ошибках после предыдущего ввода
  _resetForm = () => {
    const inputList = Array.from(this._popup.querySelectorAll(selectors.inputSelector));
      inputList.forEach((inputElement) => {
        const errorElement = this._popup.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(selectors.inputErrorClass);
        errorElement.classList.remove(selectors.errorClass);
        errorElement.textContent = '';
        inputElement.value = '';
      });
  }

  // метод собирающий значения из всех полей ввода
  _getInputValues = () => {
    const inputList = (this._popup.querySelectorAll(selectors.inputSelector));
    if (this._popup.matches(selectors.popupProfile)) {
      const { 0: name, 1: job } = inputList;
      const userData = { userName: name.value, userJob: job.value };
      return userData;
    } else {
      const { 0: name, 1: link } = inputList;
      const cardData = { cardName: name.value, cardLink: link.value };
      return cardData;
    }
  };

  // метод устанавливающий обработчики событий на попап наследуемый от класса попап
  setEventListeners(evt) {
    super.setEventListeners(evt);
    if (this._popup.matches(selectors.popupProfile)) {
      this._popup.addEventListener('submit', this._handleSubmitForm);
    }
  }

}
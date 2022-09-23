// импорт класса попап
import Popup from '../components/Popup.js';
// импорт селекторов
import { selectors } from '../utils/constants.js';

// класс попапа с формой - добавляет классу попап методы по сбору данных из полей импута и их обработке и наследует часть методов от класса попап и экспорт его содержимого
export default class PopupWithForm extends Popup {
  // конструктор класса попап с формой
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(selectors.formSelector);
    this._submitButton = this._form.querySelector(selectors.submitButtonSelector);
    this._permanentText = this._submitButton.textContent;
    this._inputList = Array.from(this._popup.querySelectorAll(selectors.inputSelector));
  }

  // метод закрытия попапа с фомой наследуюмый от попапа и очищающий поля формы
  closePopup() {
    this._form.reset();
    super.closePopup();
  }

  // метод вставляющий данные в импуты
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  // метод собирающий значения из всех полей ввода
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((inputElement) => {
      this._formValues[inputElement.name] = inputElement.value;
    });
    return this._formValues;
  };

  // метод устанавливающий обработчики событий на попап наследуемый от класса попап
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  // метод отображающий загрузку данных через состояние кнопки отправки данных
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = this._permanentText;
    }
  }
}
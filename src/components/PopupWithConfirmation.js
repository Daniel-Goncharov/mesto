// импорт класса попап
import Popup from './Popup.js';
// импорт селекторов
import { selectors } from '../utils/constants.js';

// класс попапа с подтверждением действия пользователя, наследует часть методов от класса попап и экспорт его содержимого
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector(selectors.popupDeleteContainer);
    this._submitButton = this._form.querySelector(selectors.submitButtonSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._permanentText = this._submitButton.textContent;
  }

  // метод перезаписывающий метод открытия родителя для того, чтобы вызывать его на конкретной удаляемой карточке
  openPopup(card) {
    super.openPopup();
    this._card = card;
  }

  // метод отображающий загрузку данных через состояние кнопки отправки данных
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Удаление...';
    } else {
      this._submitButton.textContent = this._permanentText;
    }
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._card);
    });
    super.setEventListeners();
  }
}
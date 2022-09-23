// импорт селекторов
import { selectors } from '../utils/constants.js';

// класс попапа отвечает за открытие и закрытие попапа
export default class Popup {
  // конструктор попапа
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._closePopupOnEsc = this._closePopupOnEsc.bind(this);
  }

  // метод открывающий попап
  openPopup() {
    this._popup.classList.add(selectors.popupOpened);
    document.addEventListener('keydown', this._closePopupOnEsc);
  }

  // метод закрывающий попап
  closePopup() {
    this._popup.classList.remove(selectors.popupOpened);
    document.removeEventListener('keydown', this._closePopupOnEsc);
  }

  // метод закрывающий попап нажатием на escape
  _closePopupOnEsc = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  // метод закрывающий попап по клику мышкой
  _closePopupByClick(evt) {
    if (evt.target.classList.contains(selectors.closedButton) || evt.target.classList.contains(selectors.popup))
    {
      this.closePopup();
    }
  }

  // установка слушателя закрытия попапов по клику мышкой
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      this._closePopupByClick(evt);
    });
  }
}
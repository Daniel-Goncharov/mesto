// импорт селекторов
import { selectors } from './constants.js';

// класс попапа отвечает за открытие и закрытие попапа
export default class Popup {
  // конструктор попапа
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  // метод открывающий попап
  openPopup() {
    this._popup.classList.add(selectors.popupOpened);
    document.addEventListener('keydown', this._closePopupOnEsc);
    this.setEventListeners();
  }

  // метод закрывающий попап
  closePopup() {
    this._popup.classList.remove(selectors.popupOpened);
    document.removeEventListener('keydown', this._closePopupOnEsc);
    this._popup.removeEventListener('click', this._closePopupByClick);
  }

  // метод закрывающий попап нажатием на escape
  _closePopupOnEsc = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  // метод закрывающий попап по клику мышкой
  _closePopupByClick = (evt) => {
    const target = evt.target;
    const modal = target.closest(selectors.popup);
    if (target.classList.contains(selectors.closedButton) || target === modal) {
      this.closePopup();
    }
  }

  // установка слушателя закрытия попапов по клику мышкой
  setEventListeners() {
    this._popup.addEventListener('click', this._closePopupByClick);
  }
}
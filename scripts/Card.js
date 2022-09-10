// импорт констант с селекторами элементов внутри темплейта карточки
import { cardTemplateSelectors } from './constants.js';

// класс карточки - создаёт карточку с текстом и ссылкой на изображение
export default class Card {
  // конструктор карточки
  constructor({ name, link }, templateSelector, handleOpenBigImage) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this.handleOpenBigImage = handleOpenBigImage;
  }

  // метод для поиска и клонирования разметки карточки
  _getCardElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(cardTemplateSelectors.cardElement)
      .cloneNode(true);

    return cardElement;
  }

  // метод для наполнения карточки нужным контентом
  generateCard() {
    this._cardElement = this._getCardElement();
    this.cardPicture = this._cardElement.querySelector(cardTemplateSelectors.elementsImage);
    this.cardPicture.src = this._link;
    this.cardPicture.alt = this._name;
    this._cardElement.querySelector(cardTemplateSelectors.elementsName).textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }

  // метод для установки слушателей внутри карточки
  _setEventListeners() {
    this.cardPicture.addEventListener('click', () => this._openViewPicture());
    this._cardElement.querySelector(cardTemplateSelectors.buttonLike).addEventListener('click', () => this._likeCard());
    this._cardElement.querySelector(cardTemplateSelectors.buttonDel).addEventListener('click', () => this._deleteCard());
  }

  // метод для открытия увеличенной карточки
  _openViewPicture() {
    this.handleOpenBigImage(this._link, this._name);
  }

  // метод для лайка карточки
  _likeCard() {
    this._cardElement.querySelector(cardTemplateSelectors.buttonLike).classList.toggle(cardTemplateSelectors.liked);
  }

  // метод для удаления карточки
  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
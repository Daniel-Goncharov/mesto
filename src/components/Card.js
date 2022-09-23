// импорт констант с селекторами элементов внутри темплейта карточки
import { cardTemplateSelectors } from '../utils/constants.js';

// класс карточки - создаёт карточку с текстом и ссылкой на изображение
export default class Card {
  // конструктор карточки
  constructor(data, handleOpenBigImage, handleLikeClick, handleTrashBinClick, templateSelector, userId) {
    this._data = data;
    this.cardId = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._handleOpenBigImage = handleOpenBigImage;
    this._handleLikeClick = handleLikeClick;
    this._handleTrashBinClick = handleTrashBinClick;
    this._templateSelector = templateSelector;
    this._myId = userId;
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

  // метод обновляющий количество лайков для счетчика
  updateLikeCounter(newLike) {
    this._likes = newLike.likes;
  }

  // метод изменяющий отображение состояния кнопки лайка и количества лайков счетчика
  updateLikesView() {
    this._likeCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.add(cardTemplateSelectors.liked);
    } else {
      this._likeButton.classList.remove(cardTemplateSelectors.liked);
    }
  }

  // метод проверяющий лайкнута ли карточка пользователем
  isLiked() {
    return this._likes.some((item) => item._id === this._myId);
  }

  // метод для наполнения карточки нужным контентом
  generateCard() {
    this._cardElement = this._getCardElement();
    this._cardPicture = this._cardElement.querySelector(cardTemplateSelectors.elementsImage);
    this._cardTitle = this._cardElement.querySelector(cardTemplateSelectors.elementsName);
    this._cardPicture.src = this._link;
    this._cardPicture.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._trashBin = this._cardElement.querySelector(cardTemplateSelectors.buttonDel);
    this._likeCounter = this._cardElement.querySelector(cardTemplateSelectors.likedCounter);
    this._likeButton = this._cardElement.querySelector(cardTemplateSelectors.buttonLike);
    this._likeCounter.textContent = this._likes.length;
    if (this._ownerId != this._myId) {
      this._trashBin.remove();
    }; // если карточка не принадлежит пользователю, то кнопку удаления убрать

    if (this.isLiked()) {
      this._likeButton.classList.add(cardTemplateSelectors.liked);
    }; // если пользователь лайкал эту карточку, то кнопка лайка изменится на нажатую

    this._setEventListeners();
    return this._cardElement;
  }

  // метод для установки слушателей внутри карточки
  _setEventListeners() {
    this._cardPicture.addEventListener('click', () => this._handleOpenBigImage(this._name, this._link));
    this._likeButton.addEventListener('click', () => this._handleLikeClick(this));
    this._trashBin.addEventListener('click', () => this._handleTrashBinClick(this));
  }

   // метод для удаления карточки
  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
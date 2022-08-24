// константы увеличенной картинки
const imagePopup = document.querySelector('.popup_type_view-picture');
const popupPicture = imagePopup.querySelector('.popup__picture');
const popupPictureTitle = imagePopup.querySelector('.popup__picture-title');

// класс карточки и экспорт его содержимого
export default class Card {
  // конструктор карточки
  constructor(data, templateSelector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this.openPopup = openPopup;
  }

  // метод для поиска и клонирования разметки карточки
  _getTemplate() {
    const cardElement = document
    .querySelector('.template')
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  // метод для наполнения карточки нужным контентом
  generateCard() {
    this._element = this._getTemplate();
    this.cardPicture = this._element.querySelector('.element__picture');
    this._element.querySelector('.element__title').textContent = this._name;
    this.cardPicture.src = this._link;
    this.cardPicture.alt = `Изображение ${this._name}`;
    this._setEventListeners();
    return this._element
  }

  // метод для установки слушателей внутри карточки
  _setEventListeners() {
    this._element.querySelector('.element__delete').addEventListener('click', () => {this._deleteCard()});
    this._element.querySelector('.element__like-button').addEventListener('click', () => {this._likeCard()});
    this.cardPicture.addEventListener('click', () => {this._openViewPicture()});
  }

  // метод для удаления карточки
  _deleteCard() {
    this._element.remove();
  };

  // метод для лайка карточки
  _likeCard() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  };

  // метод для открытия увеличенной карточки
  _openViewPicture() {
    popupPictureTitle.textContent = this._name;
    popupPicture.src = this._link;
    popupPicture.alt = `Изображение ${this._name}`;
    this.openPopup(imagePopup);
  };
}


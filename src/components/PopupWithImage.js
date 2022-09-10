// импорт класса попап
import Popup from '../components/Popup.js';
// импорт селекторов
import { selectors } from '../utils/constants.js';

// класс попапа с картинкой открывает картинку из карточки на весь экран и наследует часть методов от класса попап
export default class PopupWithImage extends Popup {
  // метод открыващий картинку из карточки на весь экран
  handleCardClick = (link, name) => {
    this._popupImgPicture = document.querySelector(selectors.popupPicture);
    this._titleOfPopupImg = document.querySelector(selectors.popupTitle);

    this._popupImgPicture.src = link;
    this._popupImgPicture.alt = name;
    this._titleOfPopupImg.textContent = name;
    this.openPopup();
  }
}
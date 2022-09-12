// импорт класса попап
import Popup from '../components/Popup.js';
// импорт селекторов
import { selectors } from '../utils/constants.js';

// класс попапа с картинкой открывает картинку из карточки на весь экран и наследует часть методов от класса попап
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImgPicture = this._popup.querySelector(selectors.popupPicture);
    this._titleOfPopupImg = this._popup.querySelector(selectors.popupTitle);
  }
  // перезапись родительского метода. Теперь он открывает картинку из карточки на весь экран с подписью
  openPopup(link, name) {
    this._popupImgPicture.src = link;
    this._popupImgPicture.alt = name;
    this._titleOfPopupImg.textContent = name;
    super.openPopup();
  }
}
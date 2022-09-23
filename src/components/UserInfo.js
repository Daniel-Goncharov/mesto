// импорт селекторов
import { selectors } from "../utils/constants.js";

// класс юзеринфо - отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  // конструктор класса
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._userNameSelector = document.querySelector(userNameSelector);
    this._userJobSelector = document.querySelector(userJobSelector);
    this._avatarSelector = document.querySelector(userAvatarSelector);
  }

  // метод который возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._userNameSelector.textContent,
      about: this._userJobSelector.textContent,
      avatar: this._avatarSelector.src,
    };
  }

  // метод который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._myId = data._id;
    this._userNameSelector.textContent = data.name;
    this._userJobSelector.textContent = data.about;
    this._avatarSelector.src = data.avatar;
  }

  // метод возвращающий уникальный айди пользователя
  returnMyId() {
    return this._myId;
  }
}
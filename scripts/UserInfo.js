// импорт селекторов
import { selectors } from "./constants.js";

// класс юзеринфо - отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  // конструктор класса
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameSelector = userNameSelector;
    this._userJobSelector = userJobSelector;
  }

  // метод который возвращает объект с данными пользователя
  getUserInfo() {
    this._userName = document.querySelector(this._userNameSelector).textContent;
    this._userJob = document.querySelector(this._userJobSelector).textContent;
    this.userData = { name: this._userName, info: this._userJob };
    return this.userData;
  }

  // метод который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo() {
    this._profileName = document.querySelector(this._userNameSelector);
    this._profileCharacter = document.querySelector(this._userJobSelector);
    this._nameInput = document.querySelector(selectors.nameInput);
    this._jobInput = document.querySelector(selectors.jobInput);
    this._profileName.textContent = this._nameInput.value;
    this._profileCharacter.textContent = this._jobInput.value;
  }
}
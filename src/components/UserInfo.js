// импорт селекторов
import { selectors } from "../utils/constants.js";

// класс юзеринфо - отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  // конструктор класса
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameSelector = document.querySelector(userNameSelector);
    this._userJobSelector = document.querySelector(userJobSelector);
  }

  // метод который возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._userNameSelector.textContent,
      job: this._userJobSelector.textContent,
    };
  }

  // метод который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._userNameSelector.textContent = data.name;
    this._userJobSelector.textContent = data.job;
    console.log(data);
  }
}
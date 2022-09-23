// класс юзеринфо - отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  // конструктор класса
  constructor({ userName, userJob, userAvatar }) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
    this._avatar = document.querySelector(userAvatar);
  }

  // метод который возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userJob.textContent,
      avatar: this._avatar.src,
    };
  }

  // метод который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userJob.textContent = about;
    this._avatar.src = avatar;
    this._myId = _id;
  }

  // метод возвращающий уникальный айди пользователя
  returnMyId() {
    return this._myId;
  }
}
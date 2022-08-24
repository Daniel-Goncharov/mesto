// импорт модулей
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// константы профайла
const profilePopup = document.querySelector('.popup_type_profile');
const buttonProfileOn = document.querySelector('.profile__edit-button');
const formElementProfile = document.querySelector('.popup__form_type_profile');
const nameInput = document.querySelector('.popup__input_data_name');
const jobInput = document.querySelector('.popup__input_data_job');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');

// константы добавления карточки
const cardPopup = document.querySelector('.popup_type_add-card');
const buttonCardOn = document.querySelector('.profile__add-button');
const formElementCard = document.querySelector('.popup__form_type_add-card');
const placeImput = document.querySelector('.popup__input_data_place-name');
const pictureImput = document.querySelector('.popup__input_data_place-url');
const cardTemplate = '.template';
const cardContainer = document.querySelector('.elements__container');

// объект с селекторами для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// массив стартовых карточек
const initialCards = [
  {
    name: 'Бали',
    link: './images/elements/Bali-Indonesia.jpg'
  },
  {
    name: 'Калифорния',
    link: './images/elements/Yosemite-USA.jpg'
  },
  {
    name: 'Иордания',
    link: './images/elements/Petra-Jordan.jpg'
  },
  {
    name: 'Рим',
    link: './images/elements/Rome-Itali.jpg'
  },
  {
    name: 'Париж',
    link: './images/elements/Paris-France.jpg'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/elements/Saint-Petersburg-Russia.jpg'
  },
]

// функция открытия модальных окон
function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupViaEsc);
};

// функция закрытия модальных окон
function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupViaEsc);
};

// Функция создания новой карточки
function createCard(data, templateSelector, openPopup) {
  const card = new Card(data, templateSelector, openPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

// Функция редактирования профиля
function submitFormHandlerProfile(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(profilePopup);
};

// Функция добавления новой карточки
function submitFormHandlerCard(evt) {
  evt.preventDefault();
  const item = {
    name: placeImput.value,
    link: pictureImput.value,
  };
  const cardElement = createCard(item, cardTemplate, openPopup)
  cardContainer.prepend(cardElement);
  profileFormValidation.disableSubmitButton(evt.target);
  closePopup(cardPopup);
};

// Создание стартовых карточек из массива
initialCards.forEach(function (item) {
  const cardElement = createCard(item, cardTemplate, openPopup)
  cardContainer.append(cardElement);
});

// Добавление валидации для формы профайла
const profileFormValidation = new FormValidator(validationConfig, formElementProfile);
profileFormValidation.enableValidation();

// Добавление валидации для формы добавления карточки
const cardFormValidation = new FormValidator(validationConfig, formElementCard);
cardFormValidation.enableValidation();

// функция заполнения полей профиля и проверки что поля не пустые
function fillProfileForm() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  const eventInput = new Event("input");
  nameInput.dispatchEvent(eventInput);
  jobInput.dispatchEvent(eventInput);
};

// функция закрытия окна по нажатию на Esc
function closePopupViaEsc(evt) {
  if (evt.key === 'Escape') {
    const currentOpenPopup = document.querySelector('.popup_opened');
    closePopup(currentOpenPopup);
  }
};

// функция закрытия всех окон
function closeByOverlayClick(evt) {
  const target = evt.target;
  const cover = target.closest('.popup');
  if (target.classList.contains('popup__closed-button') || target === cover) {
    closePopup(cover);
  }
};

// обработчик события открытия окна профиля
buttonProfileOn.addEventListener('click', () => {
  fillProfileForm();
  openPopup(profilePopup);
});

// обработчик события открытия окна добавления карточки
buttonCardOn.addEventListener('click', () => {
  formElementCard.reset(),
  openPopup(cardPopup);
});

// функция вешающая обработчики для закрытия всех окон
function setEventListenerToAllPopup() {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', closeByOverlayClick);
  });
};

// вызов функции вешающей обработчики закрытия окон
setEventListenerToAllPopup();

// обработчик события отправки формы в окне профиля
formElementProfile.addEventListener('submit', submitFormHandlerProfile);

// обработчик события отправки формы в окне добавления карточки
formElementCard.addEventListener('submit', submitFormHandlerCard);

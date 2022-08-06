// константы профайла
const profilePopup = document.querySelector('.popup_type_profile');
const buttonProfileOn = document.querySelector('.profile__edit-button');
const buttonProfileOff = document.querySelector('.popup__closed-button_type_profile');

const formElementProfile = document.querySelector('.popup__form_type_profile');
const nameInput = document.querySelector('.popup__input_data_name');
const jobInput = document.querySelector('.popup__input_data_job');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');

// константы добавления карточки
const cardPopup = document.querySelector('.popup_type_add-card');
const buttonCardOn = document.querySelector('.profile__add-button');
const buttonCardOff = document.querySelector('.popup__closed-button_type_add-card');
const formElementCard = document.querySelector('.popup__form_type_add-card');
const placeImput = document.querySelector('.popup__input_data_place-name');
const pictureImput = document.querySelector('.popup__input_data_place-url');
const cardTemplate = document.querySelector('.template').content.querySelector('.element');
const cardContainer = document.querySelector('.elements__container');

// константы увеличенной картинки
const imagePopup = document.querySelector('.popup_type_view-picture');
const buttonImageOff = document.querySelector('.popup__closed-button_type_view-picture');
const popupPicture = document.querySelector('.popup__picture');
const popupPictureTitle = document.querySelector('.popup__picture-title');

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

// функция создания секции с карточками
function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.element__title');
  const cardPicture = cardElement.querySelector('.element__picture');
  const buttonDelete = cardElement.querySelector('.element__delete');
  const buttonLike = cardElement.querySelector('.element__like-button');

  cardTitle.textContent = name;
  cardPicture.src = link;
  cardPicture.alt = `Изображение ${name}`;

   // обработчик события нажатия на кнопку удаления карточки
  buttonDelete.addEventListener('click', deleteCard);

    // обработчик события нажатия на кнопку лайк
  buttonLike.addEventListener('click', likeCard);

   // обработчик события нажатия на карточку для увеличения
  cardPicture.addEventListener('click', function () {
    openViewPicture(name, link);
  });

  // возвращает переменную cardElement как результат работы функции для ее использования в функциях генерации стартовых карточек и отрисовки новых
  return cardElement;
};

 // функция удалить карточку
 function deleteCard(evt) {
  evt.target.closest('.element').remove();
};

// функция поставить лайк
function likeCard(evt) {
  evt.target.classList.toggle('element__like-button_active');
};

// функция увеличения картинки
function openViewPicture(name, link) {
  popupPictureTitle.textContent = name;
  popupPicture.src = link;
  popupPicture.alt = `Изображение ${name}`;
  openPopup(imagePopup);
};

// функция отрисовки карточек
function renderCard(name, link) {
  const newCard = createCard(name, link);
  cardContainer.prepend(newCard);
};

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
  renderCard(placeImput.value, pictureImput.value);
  blockSubmitButton(evt.target);
  closePopup(cardPopup);
};

// Функция создания стартовых карточек из массива
function createInitialCards() {
  initialCards.forEach(function (data) {
    renderCard(data.name, data.link);
  })
};

// запуск функции отрисовки стартовых карточек из массива
createInitialCards()

// функция заполнения полей профиля и проверки что поля не пустые
function fillProfileForm () {
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
function closeAllPopup(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};

// обработчик события открытия окна профиля
buttonProfileOn.addEventListener('click', () => {
  fillProfileForm ();
  openPopup(profilePopup);
});

// обработчик события открытия окна добавления карточки
buttonCardOn.addEventListener('click', () => {
  formElementCard.reset(),
  openPopup(cardPopup);
});

// функция блокирующая кнопку submit после отправки формы
function blockSubmitButton(nameForm) {
  const buttonAddCard = nameForm.querySelector('.popup__button');
  buttonAddCard.classList.add('popup__button_disabled');
  buttonAddCard.setAttribute("disabled", "disabled");
};

// обработчики для закрытия всех окон
function setEventListenerToAllPopup() {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', closeAllPopup);
  });
};

setEventListenerToAllPopup();


// обработчик события закрытия окна профиля
buttonProfileOff.addEventListener('click', () => closePopup(profilePopup));

// обработчик события закрытия окна добавления карточки
buttonCardOff.addEventListener('click', () => closePopup(cardPopup));

// обработчик события нажатия на кнопку закрыть окно увеличения картинки
buttonImageOff.addEventListener('click', () => closePopup(imagePopup));

// обработчик события отправки формы в окне профиля
formElementProfile.addEventListener('submit', submitFormHandlerProfile);

// обработчик события отправки формы в окне добавления карточки
formElementCard.addEventListener('submit', submitFormHandlerCard);

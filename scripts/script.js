// константы профайла
const popupProfile = document.querySelector('.popup_type_profile');
const openPopupProfile = document.querySelector('.profile__edit-button');
const closePopupProfile = document.querySelector('.popup__closed-button_type_profile');
const formElementProfile = document.querySelector('.popup__form_type_profile');
const nameInput = document.querySelector('.popup__input_data_name');
const jobInput = document.querySelector('.popup__input_data_job');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');

// константы добавления карточки
const popupAddCard = document.querySelector('.popup_type_add-card');
const openPopupAddCard = document.querySelector('.profile__add-button');
const closePopupAddCard = document.querySelector('.popup__closed-button_type_add-card');
const formElementAddCard = document.querySelector('.popup__form_type_add-card');
const placeImput = document.querySelector('.popup__input_data_place-name');
const pictureImput = document.querySelector('.popup__input_data_place-url');
const cardTemplate = document.querySelector('.template').content.querySelector('.element');
const cardContainer = document.querySelector('.elements__container');

// константы увеличенной картинки
const popupViewPicture = document.querySelector('.popup_type_view-picture');
const closePopupViewPicture = document.querySelector('.popup__closed-button_type_view-picture');
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
function createCards(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.element__title');
  const cardPicture = cardElement.querySelector('.element__picture');
  const deleteButton = cardElement.querySelector('.element__delete');
  const likeButton = cardElement.querySelector('.element__like-button');

  cardTitle.textContent = name;
  cardPicture.src = link;
  cardPicture.alt = `Изображение ${name}`;

  // функция удалить карточку
  function deleteCard() {
    cardElement.remove();
  };

  // обработчик события нажатия на кнопку удаления карточки
  deleteButton.addEventListener('click', deleteCard);

  // функция поставить лайк
  function likeCard() {
    likeButton.classList.toggle('element__like-button_active');
  };
  likeButton.addEventListener('click', likeCard);

  // функция увеличения картинки
  function openViewPicture(name, link) {
    popupPictureTitle.textContent = name;
    popupPicture.src = link;
    popupPicture.alt = `Изображение ${name}`;
    openPopup(popupViewPicture);
  };

  // обработчик события нажатия накарточку для увеличения
  cardPicture.addEventListener('click', function () {
    const placeName = cardTitle.textContent;
    const placeLink = cardPicture.getAttribute('src');
    openViewPicture(placeName, placeLink);
  });

  // обработчик события нажатия на кнопку закрыть окна увеличения картинки
  closePopupViewPicture.addEventListener('click', () => closePopup(popupViewPicture));
  // возвращает переменную cardElement как результат работы функции для ее использования в функциях генерации стартовых карточек и отрисовки новых
  return cardElement;
};

// функция отрисовки карточек
function renderCard(name, link) {
  const newCard = createCards(name, link);
  cardContainer.prepend(newCard);
};

// функция открытия модальных окон
function openPopup(modal) {
  modal.classList.add('popup_opened');
};

// функция закрытия модальных окон
function closePopup(modal) {
  modal.classList.remove('popup_opened');
};

// Функция редактирования профиля
function submitFormHandlerProfile(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupProfile);
};

// Функция добавления новой карточки
function submitFormHandlerAddCard(evt) {
  evt.preventDefault();
  renderCard(placeImput.value, pictureImput.value);
  closePopup(popupAddCard);
};

// Функция создания стартовых карточек из массива
function createInitialCards() {
  initialCards.forEach(function (data) {
    renderCard(data.name, data.link);
  })
};

// запуск функции отрисовки стартовых карточек из массива
createInitialCards()

// обработчик события открытия окна профиля
openPopupProfile.addEventListener('click', () => {
  nameInput.value = userName.textContent,
  jobInput.value = userJob.textContent,
  openPopup(popupProfile);
});

// обработчик события закрытия окна профиля
closePopupProfile.addEventListener('click', () => closePopup(popupProfile));

// обработчик события открытия окна добавления карточки
openPopupAddCard.addEventListener('click', () => {
  placeImput.value = '',
  pictureImput.value = '',
  openPopup(popupAddCard);
});

// обработчик события закрытия окна добавления карточки
closePopupAddCard.addEventListener('click', () => closePopup(popupAddCard));

// обработчик события отправки формы в окне профиля
formElementProfile.addEventListener('submit', submitFormHandlerProfile);

// обработчик события отправки формы в окне добавления карточки
formElementAddCard.addEventListener('submit', submitFormHandlerAddCard);


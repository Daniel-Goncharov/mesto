// константа с селекторами элементов внутри темплейта карточки
export const cardTemplateSelectors = {
  cardElement: '.element',
  elementsImage: '.element__picture',
  elementsName: '.element__title',
  buttonLike: '.element__like-button',
  buttonDel: '.element__delete',
  liked: 'element__like-button_active',
  likedCounter: '.element__like-counter',
}

// константа с селекторами
export const selectors = {
  cardTemplate: '.template',
  placeForCard: '.elements__container',
  editProfileButton: '.profile__edit-button',
  popupDelete: '.popup_type_delete',
  popupProfile: '.popup_type_profile',
  popupAvatar: '.popup_type_add-avatar',
  avatarBtn: '.profile__avatar-button',
  AvatarImg: '.profile__pic',
  formAvatar: '.popup__form_type_add-avatar',
  formProfile: '.popup__form_type_profile',
  profileName: '.profile__name',
  profileJob: '.profile__job',
  nameInput: '.popup__input_data_name',
  jobInput: '.popup__input_data_job',
  addCardButton: '.profile__add-button',
  popupCard: '.popup_type_add-card',
  formCard: '.popup__form_type_add-card',
  nameCard: '.popup__input_data_place-name',
  linkCard: '.popup__input_data_place-url',
  popup: 'popup',
  popupOpened: 'popup_opened',
  closedButton: 'popup__closed-button',
  formSelector: '.popup__form',
  popupDeleteContainer: '.popup__container_type_delete',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  popupViewPicture: '.popup_type_view-picture',
  popupPicture: '.popup__picture',
  popupTitle: '.popup__picture-title',
}

// сонстанта с селекторами для валидизации форм
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// константы попапа редактирования профиля
export const profileForm = document.querySelector(selectors.formProfile); // форма редактирования профиля
export const avatarForm = document.querySelector(selectors.formAvatar); // форма редактирования аватара
export const avatarButton = document.querySelector(selectors.avatarBtn); // кнопка редактирования аватара
export const profileEditbutton = document.querySelector(selectors.editProfileButton); // кнопка редактирования профиля
export const popupProfile = document.querySelector(selectors.popupProfile); // попап редактирования профиля
export const profileButtonElement = popupProfile.querySelector(selectors.submitButtonSelector); // кнопка отправки профиля
export const nameInput = document.querySelector(selectors.nameInput); // поле ввода имени профиля
export const jobInput = document.querySelector(selectors.jobInput); // поле ввода рода заниятий профиля
export const profileName = document.querySelector(selectors.profileName); // dom элемент показывающий имя пользователя
export const profileJob = document.querySelector(selectors.profileJob); // dom элемент показывающий род занятий пользователя

// константы попапа добавления карточки
export const cardForm = document.querySelector(selectors.formCard); // форма редактирования карточки
export const addCardButton = document.querySelector(selectors.addCardButton); // кнопка добавления карточки
export const popupCard = document.querySelector(selectors.popupCard); // попап добавления карточки
export const nameCard = document.querySelector(selectors.nameCard); // поле ввода названия места карточки
export const linkCard = document.querySelector(selectors.linkCard); // поле ввода ссылки на картинку карточки

// константы попапа с увеличенной картинкой карточки
export const popupViewPicture = document.querySelector(selectors.popupViewPicture); // попап увеличенной картинки
export const popupImgPicture = document.querySelector(selectors.popupPicture); // увеличенная картинка
export const captionOfPopupImg = document.querySelector(selectors.popupTitle); // подпись увеличенной картинки
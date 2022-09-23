// импорт файла со стилями CSS
import './index.css';

// импорт селекторов и констант
import {
  selectors,
  validationConfig,
  initialCards,
  profileForm,
  avatarForm,
  cardForm,
  profileEditbutton,
  addCardButton,
  nameInput,
  jobInput,
  avatarButton,
} from '../utils/constants.js';

// импорт классов
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

// создаем класс апи для работы с данными от сервера
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-51/',
  headers: {
    authorization: 'bfa40ffc-a9e7-4ab6-8334-2b3f41f7694b',
    'content-Type': 'application/json',
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userServerData, cardsData]) => {
    user.setUserInfo(userServerData);
    cardsList.renderItems(cardsData);
  })
  .catch((err) => {
    alert(err);
  });

const cardsList = new Section({ renderer: createCard }, selectors.placeForCard);

// добавление валидации для формы профиля
const profileFormValidation = new FormValidator(validationConfig, profileForm);
profileFormValidation.enableValidation();

// добавление валидации для формы добавления карточки
const cardFormValidation = new FormValidator(validationConfig, cardForm);
cardFormValidation.enableValidation();

// добавление валидации для формы изменения аватара
const avatarFormValidation = new FormValidator(validationConfig, avatarForm);
avatarFormValidation.enableValidation();

// создаем обект с классом юзеринфо
const user = new UserInfo({
  userNameSelector: selectors.profileName,
  userJobSelector: selectors.profileJob,
  userAvatarSelector: selectors.AvatarImg,
});

// функция создания карточки
function createCard(data) {
  const newCard = new Card(data, handleOpenBigImage, handleLikeClick, handleTrashBinClick, selectors.cardTemplate, user.returnMyId());
  const newCardElement = newCard.generateCard();
  return newCardElement;
}

// попап с картинкой на весь экран
const popupWithImage = new PopupWithImage(selectors.popupViewPicture);
popupWithImage.setEventListeners();

// попап редактора профиля
const popupWithFormProfile = new PopupWithForm(selectors.popupProfile, handleEditFormSubmit);
popupWithFormProfile.setEventListeners();

// попап добавления карточки
const popupWithFormCard = new PopupWithForm(selectors.popupCard, handleAddFormSubmit);
popupWithFormCard.setEventListeners();

// попап изменения аватара
const popupWithFormAvatar = new PopupWithForm(selectors.popupAvatar, handleAvatarFormSubmit);
popupWithFormAvatar.setEventListeners();

function handleAvatarFormSubmit(avatar) {
  popupWithFormAvatar.renderLoading(true);
  api
    .changeAvatar(avatar)
    .then((res) => {
      user.setUserInfo(res);
      popupWithFormAvatar.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithFormAvatar.renderLoading(false);
    });
}

const popupWithDeleteVerification = new PopupWithConfirmation(selectors.popupDelete, handleRemoveSubmit);
popupWithDeleteVerification.setEventListeners();

function handleRemoveSubmit(card) {
  popupWithDeleteVerification.renderLoading(true);
  api
    .deleteCard(card.cardId)
    .then(() => {
      card.deleteCard();
      popupWithDeleteVerification.closePopup();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      popupWithDeleteVerification.renderLoading(false);
    })
}

function handleEditFormSubmit(data) {
  popupWithFormProfile.renderLoading(true);
  api
    .changeUserInfo(data)
    .then((res) => {
      user.setUserInfo(res);
      popupWithFormProfile.closePopup();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      popupWithFormProfile.renderLoading(false);
    });
}

function handleAddFormSubmit(data) {
  popupWithFormCard.renderLoading(true);
  api
    .addCardServer(data)
    .then((res) => {
      cardsList.addPrependItem(createCard(res));
      popupWithFormCard.closePopup();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      popupWithFormCard.renderLoading(false);
    })
}

function handleOpenBigImage(name, link) {
  popupWithImage.openPopup(name, link);
}

function handleLikeClick(card) {
  if (!card.isLiked()) {
    api
      .addLikeToCard(card.cardId)
      .then((res) => {
        card.updateLikeCounter(res);
        card.updateLikesView();
      })
      .catch((err) => {
        alert(err);
      });
  } else {
    api
      .deleteLikeFromCard(card.cardId)
      .then((res) => {
        card.updateLikeCounter(res);
        card.updateLikesView();
      })
      .catch((err) => {
        alert(err);
      });
  }
}

function handleTrashBinClick(card) {
  popupWithDeleteVerification.openPopup(card);
}

avatarButton.addEventListener('click', () => {
  avatarFormValidation.resetForm();
  popupWithFormAvatar.openPopup();
});

// подключение слушателя кнопки открытия попапа редактирования профиля
profileEditbutton.addEventListener('click', () => {
  const { name, about } = user.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  profileFormValidation.resetForm();
  popupWithFormProfile.openPopup();
});

addCardButton.addEventListener('click', () => {
  cardFormValidation.resetForm();
  popupWithFormCard.openPopup();
});
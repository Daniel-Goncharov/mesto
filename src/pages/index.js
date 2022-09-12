// импорт файла со стилями CSS
import './index.css';

// импорт селекторов и констант
import {
  selectors,
  validationConfig,
  initialCards,
  profileForm,
  cardForm,
  buttonEdit,
  buttonAdd,
  nameInput,
  jobInput,
} from '../utils/constants.js';

// импорт классов
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// создаем обект с классом юзеринфо
const user = new UserInfo({
  userNameSelector: selectors.profileName,
  userJobSelector: selectors.profileJob,
});

// попап редактора профиля
const popupWithFormProfile = new PopupWithForm(selectors.popupProfile, (data) => {
  user.setUserInfo(data);
  popupWithFormProfile.closePopup();
});
popupWithFormProfile.setEventListeners();

// добавление валидации для формы профиля
const profileFormValidation = new FormValidator(validationConfig, profileForm);
profileFormValidation.enableValidation();

// подключение слушателя кнопки открытия попапа редактирования профиля
buttonEdit.addEventListener('click', () => {
  const { name, job } = user.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  profileFormValidation.resetForm();
  popupWithFormProfile.openPopup();
});

// попап с картинкой на весь экран
const popupWithImage = new PopupWithImage(selectors.popupViewPicture);
popupWithImage.setEventListeners();

// функция создания карточки
function createCard(item) {
  const card = new Card(item, selectors.cardTemplate, popupWithImage.openPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

// создание стартовых карточек из массива
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
  }
},
selectors.placeForCard
);

// отрисовка стартовых карточек из массива
cardsList.renderItems();

// попап добавления карточки
const popupWithFormCard = new PopupWithForm(selectors.popupCard, () => {
  const submitCard = popupWithFormCard._getInputValues();
  const cardElement = createCard(submitCard);
  cardsList.addItem(cardElement);
  popupWithFormCard.closePopup();
});
popupWithFormCard.setEventListeners();

// добавление валидации для формы добавления карточки
const cardFormValidation = new FormValidator(validationConfig, cardForm);
cardFormValidation.enableValidation();

// подключение слушателя кнопки открытия попапа добавления карточки
buttonAdd.addEventListener('click', () => {
  popupWithFormCard.openPopup();
  cardFormValidation.resetForm();
});
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
  nameCard,
  linkCard,
  profileButtonElement
} from './constants.js';

// импорт классов
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

// попап с картинкой на весь экран
const popupWithImage = new PopupWithImage(selectors.popupViewPicture);

// попап редактора профиля
const popupWithFormProfile = new PopupWithForm(selectors.popupProfile, () => {
  const user = new UserInfo({
    userNameSelector: selectors.profileName,
    userJobSelector: selectors.profileJob
  });
  user.setUserInfo();
  popupWithFormProfile.closePopup();
});

// попап добавления карточки
const popupWithFormCard = new PopupWithForm(selectors.popupCard);

// создание стартовых карточек из массива
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, selectors.cardTemplate, popupWithImage.handleCardClick);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    }
  },
  selectors.placeForCard
);

// отрисовка стартовых карточек из массива
cardsList.renderItems();

// добавление валидации для формы профиля
const profileFormValidation = new FormValidator(validationConfig, profileForm);
profileFormValidation.enableValidation();

// добавление валидации для формы добавления карточки
const cardFormValidation = new FormValidator(validationConfig, cardForm);
cardFormValidation.enableValidation();

// функция добавления новой карточки
function submitFormHandlerCard() {
  cardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const submitCard = [{
      name: nameCard.value,
      link: linkCard.value
    }];
    const oneCard = new Section({
      items: submitCard,
      renderer: (item) => {
        const card = new Card(item, selectors.cardTemplate, popupWithImage.handleCardClick);
        const cardElement = card.generateCard();
        oneCard.addItem(cardElement);
      }
    }, selectors.placeForCard);
    oneCard.renderItems();
    popupWithFormCard.closePopup();
  })
};

submitFormHandlerCard();

// подключение слушателя кнопки открытия попапа добавления карточки
buttonAdd.addEventListener('click', () => {
  popupWithFormCard.openPopup();
  cardFormValidation._disableSubmitButton(cardForm);
});

// подключение слушателя кнопки открытия попапа редактирования профиля
buttonEdit.addEventListener('click', () => {
  popupWithFormProfile.openPopup();
  const user = new UserInfo({
    userNameSelector: selectors.profileName,
    userJobSelector: selectors.profileJob
  });
  nameInput.value = user.getUserInfo().name;
  jobInput.value = user.getUserInfo().info;
  profileFormValidation.enableButtonState(profileButtonElement);
});

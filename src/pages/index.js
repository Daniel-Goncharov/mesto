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
  nameCard,
  linkCard,
  profileButtonElement
} from '../utils/constants.js';

// импорт классов
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// попап с картинкой на весь экран
const popupWithImage = new PopupWithImage(selectors.popupViewPicture);

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

// подключение слушателя кнопки открытия попапа редактирования профиля
buttonEdit.addEventListener('click', () => {
  const { name, job } = user.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  profileFormValidation.resetForm();
  popupWithFormProfile.openPopup();
});

// попап добавления карточки
const popupWithFormCard = new PopupWithForm(selectors.popupCard);

// создание стартовых карточек из массива
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, selectors.cardTemplate, popupWithImage.openPopup);
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
        const card = new Card(item, selectors.cardTemplate, popupWithImage.openPopup);
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
  cardFormValidation.resetForm();
});



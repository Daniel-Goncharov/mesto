const openPopup = document.querySelector('.profile__edit-button');
const closePopup = document.querySelector('.popup__closed-button');
const submitButton = document.querySelector('.popup__submit-button');
const popup = document.querySelector('.popup');
const nameInput = document.querySelector('.popup__input_data_name');
const jobInput = document.querySelector('.popup__input_data_job');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const formElement = document.querySelector('.popup__form');

function openUserInfo() {
  popup.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
};

function closeUserInfo() {
  popup.classList.remove('popup_opened');
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closeUserInfo();
};

openPopup.addEventListener('click', openUserInfo);
closePopup.addEventListener('click', closeUserInfo);
formElement.addEventListener('submit', formSubmitHandler);

import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const feedbackFormData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('textarea'),
  email: document.querySelector('input'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

populetTextarea();

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();

  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(evt) {
  feedbackFormData[evt.target.name] = evt.target.value;
  console.log(feedbackFormData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormData));
}

function populetTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    console.log(savedMessage);

    refs.textarea.value = savedMessage.message;
    refs.email.value = savedMessage.email;
  }
}

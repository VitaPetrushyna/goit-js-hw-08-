import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

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

  const formData = new FormData(refs.form);
  formData.forEach((value, name) => console.log(value, name));
}

function onTextareaInput(evt) {
  let persistedFilters = localStorage.getItem(STORAGE_KEY);
  persistedFilters = persistedFilters ? JSON.parse(persistedFilters) : {};
  persistedFilters[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedFilters));
}

function populetTextarea() {
  let persistedFilters = localStorage.getItem(STORAGE_KEY);
  if (persistedFilters) {
    persistedFilters = JSON.parse(persistedFilters);
    Object.entries(persistedFilters).forEach(([name, value]) => {
      refs.form.elements[name].value = value;
    });
  }
}

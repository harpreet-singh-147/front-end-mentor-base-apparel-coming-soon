const announcementFormEl = document.querySelector('.announcement__form');
const emailInput = document.querySelector('.announcement__form-email-input');
const submitBtn = document.querySelector('.announcement__form-btn-submit');
const errorMessage = document.querySelector(
  '.announcement__form-error-message'
);
const errorIcon = document.querySelector('.announcement__form-error-icon');

const toggleVisibility = (el, isVisible) => {
  el.style.visibility = isVisible ? 'visible' : 'hidden';
  el.style.opacity = isVisible ? 1 : 0;
};

const updateLabelPosition = () => {
  emailInput.classList.toggle('has-content', emailInput.value.trim() !== '');
};

const focusIfEmpty = () => {
  if (!emailInput.classList.contains('has-content')) {
    emailInput.focus();
  }
};

const handleSubmit = e => {
  e.preventDefault();
  errorMessage.textContent = '';

  if (!emailInput.checkValidity()) {
    if (emailInput.validity.valueMissing) {
      showError('This field is required.');
    } else if (emailInput.validity.typeMismatch) {
      showError('Please provide a valid email');
    }
    focusIfEmpty();
  } else {
    emailInput.value = '';
    emailInput.classList.remove('has-content');
    hideError();
  }
};

const showError = err => {
  errorMessage.textContent = err;
  toggleVisibility(errorMessage, true);
  errorMessage.removeAttribute('aria-hidden');
  toggleVisibility(errorIcon, true);
};

const hideError = () => {
  toggleVisibility(errorMessage, false);
  errorMessage.setAttribute('aria-hidden', 'true');
  toggleVisibility(errorIcon, false);
};

emailInput.addEventListener('input', () => {
  if (emailInput.value.length > 0) {
    hideError();
  }
  updateLabelPosition();
});

emailInput.addEventListener('blur', () => {
  updateLabelPosition();
  submitBtn.classList.remove('focused');
  if (emailInput.value.trim() === '') {
    hideError();
  }
});

emailInput.addEventListener('focus', () => submitBtn.classList.add('focused'));

announcementFormEl.addEventListener('submit', handleSubmit);

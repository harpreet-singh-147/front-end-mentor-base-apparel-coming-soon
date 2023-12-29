const announcementFormEl = document.querySelector('.announcement__form');
const emailInput = document.querySelector('.announcement__form-email-input');
const submitBtn = document.querySelector('.announcement__form-btn-submit');
const errorMessage = document.querySelector(
  '.announcement__form-error-message'
);
const errorIcon = document.querySelector('.announcement__form-error-icon');

const makeVisible = el => {
  el.style.visibility = 'visible';
  el.style.opacity = 1;
};

const makeInvisible = el => {
  el.style.visibility = 'hidden';
  el.style.opacity = 0;
};

const updateLabelPosition = () => {
  if (emailInput.value.trim() !== '') {
    emailInput.classList.add('has-content');
  } else {
    emailInput.classList.remove('has-content');
  }
};

const handleSubmit = e => {
  e.preventDefault();
  errorMessage.textContent = '';

  if (!emailInput.checkValidity()) {
    if (emailInput.validity.valueMissing) {
      showError('This field is required.');
      if (!emailInput.classList.contains('has-content')) {
        emailInput.focus();
      }
    } else if (emailInput.validity.typeMismatch) {
      showError('Please provide a valid email');
      if (!emailInput.classList.contains('has-content')) {
        emailInput.focus();
      }
    }
  } else {
    emailInput.value = '';
    emailInput.classList.remove('has-content');
    hideError();
    makeInvisible(errorIcon);
  }
};

const showError = err => {
  errorMessage.textContent = err;
  makeVisible(errorMessage);
  errorMessage.removeAttribute('aria-hidden');
  makeVisible(errorIcon);
};

const hideError = () => {
  makeInvisible(errorMessage);
  errorMessage.setAttribute('aria-hidden', 'true');
  makeVisible(errorIcon);
};

emailInput.addEventListener('input', () => {
  if (emailInput.value.length > 0) {
    hideError();
    makeInvisible(errorIcon);
  }
});

emailInput.addEventListener('input', updateLabelPosition);

emailInput.addEventListener('blur', () => {
  updateLabelPosition();
  if (emailInput.value.trim() === '') {
    hideError();
    makeInvisible(errorIcon);
  }
});

emailInput.addEventListener('focus', () => {
  submitBtn.classList.add('focused');
});

emailInput.addEventListener('blur', () => {
  submitBtn.classList.remove('focused');
});

announcementFormEl.addEventListener('submit', handleSubmit);

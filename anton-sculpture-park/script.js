// script.js — External form validation for your Contact form
// Validates each block and places an error message directly under the <p> that contains the field.
// Only touches the form with class="form".

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form.form');
  if (!form) return; // nothing to do if form not present

  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const messageInput = form.querySelector('#message');

  // Helper: create or get error container inside the same <p> block
  function getErrorElFor(input) {
    const p = input.closest('p') || input.parentElement;
    if (!p) return null;
    let err = p.querySelector('.error-message');
    if (!err) {
      err = document.createElement('div');
      err.className = 'error-message';
      err.setAttribute('aria-live', 'polite');
      // place after the last child of the <p> so it appears under the block
      p.appendChild(err);
    }
    return err;
  }

  function showError(input, msg) {
    const err = getErrorElFor(input);
    if (err) err.textContent = msg;
    input.classList.add('invalid');
    input.setAttribute('aria-invalid', 'true');
  }

  function clearError(input) {
    const err = getErrorElFor(input);
    if (err) err.textContent = '';
    input.classList.remove('invalid');
    input.removeAttribute('aria-invalid');
  }

  // Basic email validation (reasonable for UI checks)
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return re.test(email);
  }

  // Field validators return true when valid
  function validateName() {
    const v = (nameInput.value || '').trim();
    if (!v) {
      showError(nameInput, 'Please enter your name.');
      return false;
    }
    if (v.length < 2) {
      showError(nameInput, 'Name must be at least 2 characters.');
      return false;
    }
    clearError(nameInput);
    return true;
  }

  function validateEmail() {
    const v = (emailInput.value || '').trim();
    if (!v) {
      showError(emailInput, 'Please enter your email address.');
      return false;
    }
    if (!isValidEmail(v)) {
      showError(emailInput, 'Please enter a valid email (e.g. you@example.com).');
      return false;
    }
    clearError(emailInput);
    return true;
  }

  function validateMessage() {
    const v = (messageInput.value || '').trim();
    if (!v) {
      showError(messageInput, 'Please enter your message.');
      return false;
    }
    if (v.length < 10) {
      showError(messageInput, 'Message must be at least 10 characters.');
      return false;
    }
    clearError(messageInput);
    return true;
  }

  // Live validation
  nameInput.addEventListener('input', validateName);
  nameInput.addEventListener('blur', validateName);

  emailInput.addEventListener('input', validateEmail);
  emailInput.addEventListener('blur', validateEmail);

  messageInput.addEventListener('input', validateMessage);
  messageInput.addEventListener('blur', validateMessage);

  // On submit: validate all and prevent default if any invalid
  form.addEventListener('submit', function (e) {
    // Validate all fields
    const nameOk = validateName();
    const emailOk = validateEmail();
    const messageOk = validateMessage();

    if (!(nameOk && emailOk && messageOk)) {
      e.preventDefault();
      // focus first invalid field
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid && typeof firstInvalid.focus === 'function') firstInvalid.focus();
      return;
    }

    // If you want to handle submission via JavaScript (AJAX), do it here.
    // For now we'll let the form submit normally (remove the next line if you want real submit).
    e.preventDefault();
    // show a simple success message under the form
    displaySuccess('Thank you — your message was validated and would be sent.');
    form.reset();
  });

  // small helper to show a transient success message beneath the form
  function displaySuccess(text) {
    // remove any existing
    const existing = form.parentElement.querySelector('.form-success');
    if (existing) existing.remove();

    const el = document.createElement('div');
    el.className = 'form-success';
    el.setAttribute('role', 'status');
    el.textContent = text;
    form.parentElement.insertBefore(el, form.nextSibling);

    setTimeout(() => {
      el.remove();
    }, 5000);
  }
}); 
// DIGITAL CLOCK SCRIPT
document.addEventListener('DOMContentLoaded', function () {
  const clockEl = document.getElementById('clock');
  if (!clockEl) return; // Only run on pages that have the clock

  function updateClock() {
    const now = new Date();

    // Format time
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const day = now.toLocaleDateString('en-ZA', { weekday: 'short' });
    const date = now.toLocaleDateString('en-ZA');

    // Add leading zeros
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    // Display format: "Wed, 22 Oct 2025 | 14:35:09"
    clockEl.textContent = `${day}, ${date} | ${hours}:${minutes}:${seconds}`;
  }

  // Initial update + interval
  updateClock();
  setInterval(updateClock, 1000);
});
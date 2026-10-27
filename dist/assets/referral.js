(() => {
  const form = document.querySelector('#referral-signup');
  const phone = form.elements.whatsapp;
  phone.addEventListener('input', () => phone.setCustomValidity(''));
  let sending = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending) return;
    const number = phone.value.trim();
    const digits = number.replace(/\D/g, '');
    phone.setCustomValidity(/^[+\d\s()-]+$/.test(number) && digits.length >= 7 && digits.length <= 15
      ? '' : 'Enter a valid WhatsApp number, including your country code outside Pakistan.');
    if (!form.reportValidity() || form.elements.website.value) return;
    const button = form.querySelector('[type="submit"]');
    const error = document.querySelector('#referral-error');
    const body = new URLSearchParams(new FormData(form));
    ['name', 'email', 'whatsapp', 'organization', 'notes'].forEach(key => body.set(key, body.get(key).trim()));
    sending = true;
    button.disabled = true;
    button.textContent = 'Submitting…';
    error.textContent = '';
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });
      if (!response.ok) throw new Error('Submission failed');
      document.querySelector('#referral-form-content').hidden = true;
      const success = document.querySelector('#referral-success');
      success.hidden = false;
      success.querySelector('h2').focus();
      form.reset();
    } catch {
      error.textContent = 'We could not submit your application. Please try again, or email contact@get-ilma.cloud. Your details are still in the form.';
      button.disabled = false;
      button.textContent = 'Submit referral application →';
    } finally {
      sending = false;
    }
  });
})();

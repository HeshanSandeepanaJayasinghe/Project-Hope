const ALLOWED_PAYHERE_ACTIONS = new Set([
  'https://sandbox.payhere.lk/pay/checkout',
  'https://www.payhere.lk/pay/checkout',
]);

/**
 * Submits the PayHere checkout form returned by /api/payment/pay.
 *
 * The HTML is parsed with DOMParser (an inert document: no scripts or event handlers run)
 * and only the hidden input values are copied into a freshly built form, so the server
 * response is never injected into the page with innerHTML.
 */
export const submitPayHereForm = (formHtml) => {
  const parsed = new DOMParser().parseFromString(formHtml, 'text/html');
  const sourceForm = parsed.querySelector('form');
  const action = sourceForm?.getAttribute('action');

  if (!sourceForm || !ALLOWED_PAYHERE_ACTIONS.has(action)) {
    throw new Error('Unexpected payment form');
  }

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = action;
  form.style.display = 'none';

  sourceForm.querySelectorAll('input[type="hidden"]').forEach((input) => {
    const field = document.createElement('input');
    field.type = 'hidden';
    field.name = input.getAttribute('name');
    field.value = input.getAttribute('value') ?? '';
    form.appendChild(field);
  });

  const orderId = form.querySelector('input[name="order_id"]')?.value;
  if (orderId) {
    localStorage.setItem('pendingOrderId', orderId);
  }

  document.body.appendChild(form);
  form.submit();
};

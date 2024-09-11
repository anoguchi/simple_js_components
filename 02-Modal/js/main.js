// Start writing JavaScript here!
const modalButton = document.querySelector('.button');
const closeButton = document.querySelector('.modal__close-button');
const modalOverlay = document.querySelector('.modal-overlay')
const modal = document.querySelector('.modal')

modalButton.addEventListener('click', () => {
  document.body.classList.add('modal-is-open');
});

closeButton.addEventListener('click', () => {
  document.body.classList.remove('modal-is-open');
});

modalOverlay.addEventListener('click', event => {
  if (!event.target.closest('.modal')) {
    // Close modal
    document.body.classList.remove('modal-is-open')
  }
})
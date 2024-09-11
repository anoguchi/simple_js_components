const menuButton = document.querySelector(".menu-button");
const body = document.body;

menuButton.addEventListener("click", () => {
  body.classList.toggle("offsite-is-open");
});

const accordionContainer = document.querySelector(".accordion-container");
const accordions = [...accordionContainer.querySelectorAll(".accordion")];

accordions.forEach((accordion) => {
  if (accordion.classList.contains("is-open")) {
    const accordionInner = accordion.querySelector(".accordion__inner");
    const accordionContent = accordionInner.parentElement;

    let height = accordionInner.getBoundingClientRect().height;
    accordionContent.style.height = height + "px";
  }
});

accordionContainer.addEventListener("click", (event) => {
  const accordionHeader = event.target.closest(".accordion__header");
  if (!accordionHeader) return;

  const accordionContent = accordionHeader.nextElementSibling;
  const accordionInner = accordionContent.children[0];
  const accordion = accordionHeader.parentElement;

  const height = accordion.classList.contains("is-open")
    ? 0
    : accordionInner.getBoundingClientRect().height;

  accordion.classList.toggle("is-open");
  accordionContent.style.height = `${height}px`;
  console.log(height);
});

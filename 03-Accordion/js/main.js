const accordionContainer = document.querySelector(".accordion-container");
const accordions = [...accordionContainer.querySelectorAll(".accordion")];

/**
 * Finds the correct height of the accordion content
 * @param {HTMLElement} accordion The accordion
 * @returns {Number} Accordion content's height in px value
 */
function getAccordionInnerHeight(accordion) {
  const accordionInner = accordion.querySelector(".accordion__inner");

  if (accordion.classList.contains("is-open")) return 0;
  return accordionInner.getBoundingClientRect().height;
}

/**
 * Toggles the open state of an accordion element and updates its content height.
 * @param {HTMLElement} accordion - The accordion element to update.
 * @returns {HTMLElement} - The updated accordion element.
 */
function updateAccordion(accordion, height) {
  const accordionContent = accordion.querySelector(".accordion__content");

  // Updates the accordion
  accordion.classList.toggle("is-open");
  accordionContent.style.height = `${height}px`;
}

/**
 * Sets the height of an open accordion element to match its inner content.
 * @param {HTMLElement} accordion - The accordion element whose height needs to be set.
 */
function setAccordionHeight(accordion) {
  if (accordion.classList.contains("is-open")) {
    const accordionInner = accordion.querySelector(".accordion__inner");
    const accordionContent = accordionInner.parentElement;

    let height = accordionInner.getBoundingClientRect().height;
    accordionContent.style.height = `${height}px`;
  }
}

accordions.forEach((accordion) => {
  setAccordionHeight(accordion);
});

accordionContainer.addEventListener("click", (event) => {
  const accordionHeader = event.target.closest(".accordion__header");
  const accordion = accordionHeader.parentElement;
  const height = getAccordionInnerHeight(accordion);
  if (!accordionHeader) return;

  updateAccordion(accordion, height);
});

const carousel = document.querySelector(".carousel");
const previousButton = carousel.querySelector(".previous-button");
const nextButton = carousel.querySelector(".next-button");
const contents = carousel.querySelector(".carousel__contents");
const dots = [...carousel.querySelectorAll(".carousel__dot")];
const slides = [...carousel.querySelectorAll(".carousel__slide")];
const dotsContainer = carousel.querySelector(".carousel__dots");

const slideWidth = slides[0].getBoundingClientRect().width;

function setSlidePositions() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + "px";
  });
}

function switchSlide(currentSlide, targetSlide) {
  const destination = getComputedStyle(targetSlide).left;
  contents.style.transform = `translateX(-${destination})`;
  currentSlide.classList.remove("is-selected");
  targetSlide.classList.add("is-selected");
}

function highlightDot(currentDot, targetDot) {
  currentDot.classList.remove("is-selected");
  targetDot.classList.add("is-selected");
}

function showHideArrowButtons(targetSlideIndex) {
  if (targetSlideIndex === 0) {
    previousButton.setAttribute("hidden", true);
    nextButton.removeAttribute("hidden");
  } else if (targetSlideIndex === dots.length - 1) {
    previousButton.removeAttribute("hidden");
    nextButton.setAttribute("hidden", true);
  } else {
    previousButton.removeAttribute("hidden");
    nextButton.removeAttribute("hidden");
  }
}

setSlidePositions();

nextButton.addEventListener("click", (event) => {
  const currentSlide = contents.querySelector(".is-selected");
  const nextSlide = currentSlide.nextElementSibling;

  switchSlide(currentSlide, nextSlide);

  previousButton.removeAttribute("hidden");

  const nextSlideIndex = slides.findIndex((slide) => slide === nextSlide);

  showHideArrowButtons(nextSlideIndex);

  // Highlight dot
  const currentDot = dotsContainer.querySelector(".is-selected");
  const nextDot = currentDot.nextElementSibling;
  highlightDot(currentDot, nextDot);
});

previousButton.addEventListener("click", (event) => {
  const currentSlide = contents.querySelector(".is-selected");
  const previousSlide = currentSlide.previousElementSibling;

  switchSlide(currentSlide, previousSlide);

  const previousSlideIndex = slides.findIndex(
    (slide) => slide === previousSlide
  );

  showHideArrowButtons(previousSlideIndex);

  // Highlight dot
  const currentDot = dotsContainer.querySelector(".is-selected");
  const previousDot = currentDot.previousElementSibling;
  highlightDot(currentDot, previousDot);
});

dotsContainer.addEventListener("click", (event) => {
  const dot = event.target.closest("button");
  if (!dot) return;

  const currentSlide = contents.querySelector(".is-selected");
  const targetSlideIndex = dots.findIndex((d) => d === dot);
  const currentDot = dotsContainer.querySelector(".is-selected");
  const slideToShow = slides[targetSlideIndex];

  switchSlide(currentSlide, slideToShow);
  highlightDot(currentDot, dot);
  showHideArrowButtons(targetSlideIndex);
});

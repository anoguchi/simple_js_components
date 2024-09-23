const carousel = document.querySelector(".carousel");
const previousButton = carousel.querySelector(".previous-button");
const nextButton = carousel.querySelector(".next-button");
const contents = carousel.querySelector(".carousel__contents");
const dots = [...carousel.querySelectorAll(".carousel__dot")];
const slides = [...carousel.querySelectorAll(".carousel__slide")];
const dotsContainer = carousel.querySelector(".carousel__dots");

const slideWidth = slides[0].getBoundingClientRect().width;

function getCurrentSlideIndex() {
  const currentSlide = contents.querySelector(".is-selected");
  return slides.findIndex((slide) => slide === currentSlide);
}

function setSlidePositions() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + "px";
  });
}

function switchSlide(currentSlideIndex, targetSlideIndex) {
  const currentSlide = slides[currentSlideIndex];
  const targetSlide = slides[targetSlideIndex];
  const destination = getComputedStyle(targetSlide).left;
  contents.style.transform = `translateX(-${destination})`;
  currentSlide.classList.remove("is-selected");
  targetSlide.classList.add("is-selected");
}

function highlightDot(currentSlideIndex, targetSlideIndex) {
  const currentDot = dots[currentSlideIndex];
  const targetDot = dots[targetSlideIndex];
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
  const currentSlideIndex = getCurrentSlideIndex();
  const nextSlideIndex = currentSlideIndex + 1;

  switchSlide(currentSlideIndex, nextSlideIndex);
  highlightDot(currentSlideIndex, nextSlideIndex);
  showHideArrowButtons(nextSlideIndex);
});

previousButton.addEventListener("click", (event) => {
  const currentSlideIndex = getCurrentSlideIndex();
  const previousSlideIndex = currentSlideIndex - 1;

  switchSlide(currentSlideIndex, previousSlideIndex);
  highlightDot(currentSlideIndex, previousSlideIndex);
  showHideArrowButtons(previousSlideIndex);
});

dotsContainer.addEventListener("click", (event) => {
  const dot = event.target.closest("button");
  if (!dot) return;

  const currentSlideIndex = getCurrentSlideIndex();
  const targetSlideIndex = dots.findIndex((d) => d === dot);

  switchSlide(currentSlideIndex, targetSlideIndex);
  highlightDot(currentSlideIndex, targetSlideIndex);
  showHideArrowButtons(targetSlideIndex);
});

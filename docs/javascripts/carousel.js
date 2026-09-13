document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = [...carousel.querySelectorAll(".carousel-slide")];
  const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
  let currentIndex = 0;
  let timer;
  let paused = false;
  const horizontal = carousel.classList.contains("image-carousel--horizontal");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pauseButton = carousel.querySelector("[data-carousel-pause]");

  const showSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === currentIndex);
      slide.setAttribute("aria-hidden", slideIndex !== currentIndex);
      if (horizontal) slide.style.transform = `translateX(${(slideIndex - currentIndex) * 100}%)`;
    });
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentIndex;
      dot.classList.toggle("is-active", isActive);
      dot.toggleAttribute("aria-current", isActive);
    });
  };

  const startTimer = () => {
    clearInterval(timer);
    if (paused || (horizontal && reducedMotion.matches) || carousel.matches(":hover") || carousel.contains(document.activeElement)) return;
    timer = setInterval(() => showSlide(currentIndex + 1), 5000);
  };

  carousel.querySelector("[data-carousel-previous]").addEventListener("click", () => {
    showSlide(currentIndex - 1);
    startTimer();
  });
  carousel.querySelector("[data-carousel-next]").addEventListener("click", () => {
    showSlide(currentIndex + 1);
    startTimer();
  });
  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      showSlide(dotIndex);
      startTimer();
    });
  });

  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  pauseButton?.addEventListener("click", () => {
    paused = !paused;
    pauseButton.textContent = paused ? "Play slideshow" : "Pause slideshow";
    startTimer();
  });
  reducedMotion.addEventListener("change", startTimer);
  carousel.addEventListener("mouseleave", startTimer);
  carousel.addEventListener("focusin", () => clearInterval(timer));
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) startTimer();
  });

  showSlide(0);
  startTimer();
});

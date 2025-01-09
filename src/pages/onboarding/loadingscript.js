const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
const transitionContainer = document.querySelector(".transition-container");

const swiperEl = document.querySelector("swiper-container");

swiperEl.addEventListener("autoplaytimeleft", (e) => {
  const [swiper, time, progress] = e.detail;
  progressCircle.style.setProperty("--progress", 1 - progress);
  progressContent.textContent = `${Math.ceil(time / 1000)}s`;
});

setTimeout(() => {
  transitionContainer.classList.add("transition-active");
  setTimeout(() => {
    window.location.href = "./loadingswiper.html";
  }, 1000);
}, 3000);

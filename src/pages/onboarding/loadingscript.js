const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
const transitionContainer = document.querySelector(".transition-container"); // Your transition element

const swiperEl = document.querySelector("swiper-container");

swiperEl.addEventListener("autoplaytimeleft", (e) => {
  const [swiper, time, progress] = e.detail;
  progressCircle.style.setProperty("--progress", 1 - progress);
  progressContent.textContent = `${Math.ceil(time / 1000)}s`;
});

// Add transition effect before redirect
setTimeout(() => {
  // Add transition class to activate the animation
  transitionContainer.classList.add("transition-active");

  // Redirect after the transition finishes
  setTimeout(() => {
    window.location.href = "./loadingswiper.html";
  }, 1000); // Delay should match the transition duration (1s)
}, 3000); // Original delay for the timeout



   

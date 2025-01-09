const transitionContainer = document.querySelector(".transition-container");

let swiper = new Swiper('.swiper', {
  spaceBetween: 30,
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
  initialSlide: 0,
});

const nextButtons = document.querySelectorAll('.next-btn');
nextButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
      if (index === nextButtons.length - 1) {
          transitionContainer.classList.add("transition-active");

          setTimeout(() => {
              window.location.href = '../../pages/login/login.html'; 
          }, 1000); 
      } else {
          swiper.slideNext();
      }
  });
});

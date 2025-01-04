const transitionContainer = document.querySelector(".transition-container");

let swiper = new Swiper('.swiper', {
  spaceBetween: 30,
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
  initialSlide: 0,
});

// دکمه‌های "Next" را انتخاب می‌کنیم
const nextButtons = document.querySelectorAll('.next-btn');
nextButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
      // اگر دکمه آخر کلیک شده باشد
      if (index === nextButtons.length - 1) {
          // افزودن کلاس transition-active برای فعال‌سازی انیمیشن
          transitionContainer.classList.add("transition-active");

          // انتقال به صفحه جدید پس از مدت زمان انیمیشن (1 ثانیه)
          setTimeout(() => {
              window.location.href = '../../pages/login/login.html'; 
          }, 1000); // مدت زمان 1000 میلی‌ثانیه (1 ثانیه)
      } else {
          // رفتن به اسلاید بعدی
          swiper.slideNext();
      }
  });
});

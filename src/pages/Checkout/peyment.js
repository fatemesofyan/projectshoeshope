
const apply=document.getElementById("Payment");

apply.addEventListener("click",()=>{
    window.location.href="./orderSuccessful.html";
});


const backArrow = document.getElementById("back-arrow");
const backdrop = document.getElementById("loading-backdrop");

backArrow.addEventListener("click", () => {
  backdrop.classList.remove("hidden");

  setTimeout(() => {
    window.location.href ="../Checkout/checkout2.html";
  }, 2000); 

  setTimeout(() => {
    backdrop.classList.add("hidden");
  }, 2500); 
});
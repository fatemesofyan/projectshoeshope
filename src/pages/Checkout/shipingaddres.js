const apply=document.getElementById("apply");

apply.addEventListener("click",()=>{
    window.location.href="./ChooseShipping.html";
});


const backArrow = document.getElementById("back-arrow");
const backdrop = document.getElementById("loading-backdrop");

backArrow.addEventListener("click", () => {
  backdrop.classList.remove("hidden");

  setTimeout(() => {
    window.location.href ="../Checkout/checkout1.html" ;
  }, 2000); 

  setTimeout(() => {
    backdrop.classList.add("hidden");
  }, 2500); 
});
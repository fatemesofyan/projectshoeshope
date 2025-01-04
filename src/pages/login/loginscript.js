import { loginUser } from '../servises/user.js'

const emailInput = document.getElementById("emailInput")
const passwordInput = document.getElementById("passwordInput")

window.login = async function(){
    const status = await loginUser(emailInput.value,passwordInput.value)

    if(status){
        location.href = "../../pages/home/home.html"
    }
}


const backArrow = document.getElementById("back-arrow");
const backdrop = document.getElementById("loading-backdrop");

backArrow.addEventListener("click", () => {
  backdrop.classList.remove("hidden");

  setTimeout(() => {
    window.location.href = "../../pages/onboarding/loadingswiper.html";
  }, 2000); 

  setTimeout(() => {
    backdrop.classList.add("hidden");
  }, 2500); 
});



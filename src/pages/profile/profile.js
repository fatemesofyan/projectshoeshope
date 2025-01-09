const home = document.getElementById("home");
const Order = document.getElementById("Order");
const Cart = document.getElementById("Cart");
const Wallet = document.getElementById("Wallet");
const SignOut = document.getElementById("SignOut");

home.addEventListener("click", () => {
  window.location.href = "../home/home.html";
});

Order.addEventListener("click", () => {
  window.location.href = "../orders/Activecart.html";
});

Cart.addEventListener("click", () => {
  window.location.href = "../Cart/mycart.html";
});

Wallet.addEventListener("click", () => {
  window.location.href = "../Checkout/checkout1.html";
});

SignOut.addEventListener("click", () => {
    window.location.href = "../onboarding/loading.html";
  });

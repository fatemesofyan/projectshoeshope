const checkoutContainer = document.getElementById("checkout-container"); 
const checkoutTotalPrice = document.getElementById("checkout-total"); 
const continuePayment = document.getElementById("Payment");
const totalPriceElement = document.getElementById("totalPrice"); // اصلاح نام متغیر
const promoElement = document.getElementById("promo");

const API_KEY =
  "sofyan-124D0Wxgxrzb4clJ6OJAguR83UwqiXvtlBNvQht1ZxPjtY1NUqA7rpEoyja7yDoOWjPEm07WnuzMsa0jGNpyKoXBLRNDvAObXHXfQ70g1eyeu0Gx4Vefq57K3";

const API_BASE_URL = "http://api.alikooshesh.ir:3000";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzkwZTNmZDU4ZmE5NDQ1ZTZhOThiMCIsImlhdCI6MTczNjI1MDczNiwiZXhwIjoxNzM2NDIzNTM2fQ.3oEeD9x7L5b5xwx28-kWmbSg3GNNWKw_D_G8XWSafbs";

async function fetchCartItems() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/records/carts`, {
      method: "GET",
      headers: {
        api_key: API_KEY,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart items");
    }

    const cartData = await response.json();
    renderCheckoutItems(cartData.records);
  } catch (error) {
    console.error("Error fetching cart items:", error.message);
  }
}

function renderCheckoutItems(cartItems) {
  checkoutContainer.innerHTML = "";
  let totalCartPrice = 0;

  if (cartItems.length === 0) {
    checkoutContainer.innerHTML = `<p>Your cart is empty.</p>`;
    checkoutTotalPrice.innerHTML = "<p> $0.00</p>";
    totalPriceElement.innerHTML = "$0.00"; // به‌روزرسانی مبلغ نهایی
    promoElement.innerHTML = "$0.00"; // به‌روزرسانی مقدار تخفیف
    return;
  }

  cartItems.forEach((item) => {
    const totalPrice = (item.price * item.quantity).toFixed(2);
    totalCartPrice += parseFloat(totalPrice);

    checkoutContainer.innerHTML += `
      <div class="flex flex-row gap-2 rounded-3xl w-full shadow-lg bg-white p-2">
        <!-- Image Section -->
        <div class="bg-[#F3F3F3] rounded-3xl w-24 p-2">
          <img src="${item.imageURL}" alt="${item.name}" class="w-16 h-16" />
        </div>
        
        <!-- Product Details Section -->
        <div class="flex flex-col w-full">
          <h2 class="text-[#152536] font-bold text-lg">${item.name}</h2>
          
          <!-- Price and Quantity Section -->
          <div class="flex flex-row gap-44 items-center">
            <h3 class="text-[#152536] font-bold text-lg">$${totalPrice}</h3>
            <h4 class="rounded-full bg-[#F3F3F3] w-10 h-10 flex justify-center items-center">${item.quantity}</h4>
          </div>
        </div>
      </div>
    `;
  });

  // محاسبه مبلغ نهایی با هزینه شیپینگ و تخفیف
  const shippingCost = 15.0; // هزینه ثابت شیپینگ
  const discount = (totalCartPrice + shippingCost) * 0.3; // محاسبه تخفیف
  const discountedTotal = totalCartPrice + shippingCost - discount; // مبلغ نهایی بعد از تخفیف

  // به‌روزرسانی قیمت‌ها در UI
  checkoutTotalPrice.innerHTML = `<p class="font-bold text-lg text-[#152536]"> $${totalCartPrice.toFixed(2)}</p>`;
  promoElement.innerHTML = `-$${discount.toFixed(2)}`; // نمایش مقدار تخفیف
  totalPriceElement.innerHTML = `$${discountedTotal.toFixed(2)}`; // نمایش مبلغ نهایی
}

// Fetch cart items when the page loads
fetchCartItems();

// Event listener for payment
continuePayment.addEventListener("click", () => {
  window.location.href = "./PaymentMethods.html";
});

const checkoutContainer = document.getElementById("checkout-container"); 
const checkoutTotalPrice = document.getElementById("checkout-total"); 
const continuePayment=document.getElementById("Payment");





const API_KEY =
  "sofyan-124D0Wxgxrzb4clJ6OJAguR83UwqiXvtlBNvQht1ZxPjtY1NUqA7rpEoyja7yDoOWjPEm07WnuzMsa0jGNpyKoXBLRNDvAObXHXfQ70g1eyeu0Gx4Vefq57K3";

const API_BASE_URL = "http://api.alikooshesh.ir:3000";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzkwZTNmZDU4ZmE5NDQ1ZTZhOThiMCIsImlhdCI6MTczNjQyNTAxNCwiZXhwIjoxNzM2NTk3ODE0fQ.kL2mQwFIM1tGyH8IfJPkljontvYP9eQH2at0fv7Lq_g";


  
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
        checkoutContainer.innerHTML = `<p>Error loading cart items. Please try again later.</p>`;
    }
  }
  
  function renderCheckoutItems(cartItems) {
    checkoutContainer.innerHTML = "";
    let totalCartPrice = 0;
  
    if (cartItems.length === 0) {
      checkoutContainer.innerHTML = `<p>Your cart is empty.</p>`;
      checkoutTotalPrice.innerHTML = "<p> $0.00</p>";
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
            <p class="text-sm text-gray-500">Color: ${item.color}</p>
            <p class="text-sm text-gray-500">Size: ${item.size}</p>
  
            <!-- Price and Quantity Section -->
            <div class="flex flex-row gap-44 items-center">
              <h3 class="text-[#152536] font-bold text-lg">$${totalPrice}</h3>
              <h4 class="rounded-full bg-[#F3F3F3] w-10 h-10 flex justify-center items-center">${item.quantity}</h4>
            </div>
          </div>
        </div>
      `;
    });
  
    checkoutTotalPrice.innerHTML = `<p class="font-bold text-lg text-[#152536]"> $${totalCartPrice.toFixed(2)}</p>`;
  }
  
  async function fetchProductId() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/records/carts`, {
        method: "GET",
        headers: {
          api_key: API_KEY,
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }
  
      const cartData = await response.json();
  
      if (cartData.records && cartData.records.length > 0) {
        cartData.records.forEach((item) => {
          completeOrder(item); 
        });
      } else {
        throw new Error("No items in cart");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
      alert("Failed to fetch cart items. Please try again.");
    }
  }
  
  async function completeOrder(item) {
    try {
      const totalPrice = (item.price * item.quantity).toFixed(2); 
      console.log("Order details being sent:", { ...item, totalPrice }); 
  
      const response = await fetch(`${API_BASE_URL}/api/records/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          api_key: API_KEY,
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          productId: item.product_id, 
          name: item.name, 
          imageURL: item.imageURL, 
          price: totalPrice, 
          color: item.color || "Unknown", 
          size: item.size || "Unknown", 
          quantity: item.quantity, 
          status: "completed", 
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to complete order");
      }
  
      window.location.href = "./ShippingAddress.html";
    } catch (error) {
      console.error("Error completing order:", error.message);
    }
  }
  
  
  async function fetchProductId() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/records/carts`, {
        method: "GET",
        headers: {
          api_key: API_KEY,
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }
  
      const cartData = await response.json();
  
      if (cartData.records && cartData.records.length > 0) {
        cartData.records.forEach((item) => {
          completeOrder(item); 
        });
      } else {
        throw new Error("No items in cart");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
     
    }
  }
  
    
    
    continuePayment.addEventListener("click", function () {
      fetchProductId(); 
    });
    
    fetchCartItems();

    const backArrow = document.getElementById("back-arrow");
    const backdrop = document.getElementById("loading-backdrop");
    
    backArrow.addEventListener("click", () => {
      backdrop.classList.remove("hidden");
    
      setTimeout(() => {
        window.location.href ="../Cart/mycart.html" ;
      }, 2000); 
    
      setTimeout(() => {
        backdrop.classList.add("hidden");
      }, 2500); 
    });
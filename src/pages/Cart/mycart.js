// const addToCartButton = document.getElementById('addtoCheckout');
const modal = document.getElementById('modal');
const cancelButton = document.getElementById("cancelBtn");
const confirmButton = document.getElementById("confirmBtn");
const cartContainer = document.getElementById("cart-container");
const modalitemDetails=document.getElementById("modal-item-details");
const checkoutButton = document.getElementById("checkout-button");


const API_KEY =
  "sofyan-124D0Wxgxrzb4clJ6OJAguR83UwqiXvtlBNvQht1ZxPjtY1NUqA7rpEoyja7yDoOWjPEm07WnuzMsa0jGNpyKoXBLRNDvAObXHXfQ70g1eyeu0Gx4Vefq57K3";

const API_BASE_URL = "http://api.alikooshesh.ir:3000";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzkwZTNmZDU4ZmE5NDQ1ZTZhOThiMCIsImlhdCI6MTczNjMyNTc3NCwiZXhwIjoxNzM2NDk4NTc0fQ.EQn1qizjiiu7VsLlLb2B0GdgBeJe8oVffpCqjGizMVs";

  

  
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
      console.log("Fetched cart items:", cartData);
      renderCartItems(cartData.records);
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
    }
  }
  
  function renderCartItems(cartItems) {
    cartContainer.innerHTML = "";
    let totalCartPrice = 0;
  
    if (cartItems.length === 0) {
      cartContainer.innerHTML = ` <div class="w-full h-screen bg-white flex flex-col justify-center items-center ">
      <img
        src="../../../public/assets/img/myOrder.png"
        alt="myOrder"
        class="w-60 h-60"
      />
      <h2 class="text-[#152536] font-bold text-2xl">Your cart is empty</h2>
      
    </div>`;
      document.querySelector(".font-bold.text-2xl").textContent = "$ 0.00";
      return;
    }
  
    cartItems.forEach((item) => {
      const totalPrice = (item.price * item.quantity).toFixed(2);
      totalCartPrice += parseFloat(totalPrice);
  
      cartContainer.innerHTML += `
      <div class="flex gap-4 rounded-3xl w-full shadow-md bg-white p-4">
        <div class="bg-[#F3F3F3] rounded-3xl w-28 p-3">
          <img id="image-${item.id}" src="${item.imageURL}" alt="${item.name}" class="w-20 h-20" />
        </div>
        <div class="flex flex-col w-full">
          <div class="flex flex-row gap-8 justify-between items-center">
            <h2 id="name-${item.id}" class="text-[#152536] font-bold text-base ">
              ${item.name}
            </h2>
            <img
              src="../../../public/assets/img/bin.svg"
              alt="delete"
              class="w-6 h-6 cursor-pointer"
              onclick="showRemoveModal('${item.id}')"
            />
          </div>
          <div class="flex flex-row gap-2 text-gray-600 mt-2">
            <h3 id="color-${item.id}">${item.color || "No Color"}</h3>
            |
            <p id="size-${item.id}">Size=${item.size || "N/A"}</p>
          </div>
          <div class="flex flex-row justify-between items-center pt-4 pb-2">
            <h3 id="price-${item.id}" class="text-black font-bold text-lg">
              $${totalPrice}
            </h3>
            <div class="bg-[#F3F3F3] rounded-3xl flex items-center">
              <button id="decrease-${item.id}" class="bg-[#F3F3F3] p-2 pl-5 rounded-l-3xl font-bold text-xl">-</button>
              <span id="quantity-${item.id}" class="bg-[#F3F3F3] p-2  text-xl">${item.quantity}</span>
              <button id="increase-${item.id}" class="bg-[#F3F3F3] p-2 pr-5 rounded-r-3xl font-bold text-xl">+</button>
            </div>
          </div>
        </div>
      </div>
    `;
  
      setTimeout(() => {
        const decreaseButton = document.getElementById(`decrease-${item.id}`);
        const increaseButton = document.getElementById(`increase-${item.id}`);
        const quantityElement = document.getElementById(`quantity-${item.id}`);
  
        if (decreaseButton && increaseButton && quantityElement) {
          decreaseButton.addEventListener("click", () => {
            const currentQuantity = parseInt(quantityElement.textContent, 10);
            if (currentQuantity > 1) {
              updateQuantity(item.id, currentQuantity - 1);
            }
          });
  
          increaseButton.addEventListener("click", () => {
            const currentQuantity = parseInt(quantityElement.textContent, 10);
            updateQuantity(item.id, currentQuantity + 1);
          });
        }
      }, 0);
    });
  
    const totalPriceElement = document.getElementById("total");
    if (totalPriceElement) {
      totalPriceElement.textContent = `$ ${totalCartPrice.toFixed(2)}`;
    }
  }
  
  
  
  async function updateQuantity(cartItemId, newQuantity) {
    if (newQuantity < 1) return; 
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/records/carts/${cartItemId}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          api_key: API_KEY,
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          quantity: newQuantity, 
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update item quantity");
      }
  
      fetchCartItems();
    } catch (error) {
      console.error("Error updating item quantity:", error.message);
    }
  }
  
  
  
let selectedCartItemId = null;

function showRemoveModal(cartItemId) {
  selectedCartItemId = cartItemId; 

  const itemImage = document.getElementById(`image-${cartItemId}`).src;
  const itemName = document.getElementById(`name-${cartItemId}`).textContent.trim();
  const itemColor = document.getElementById(`color-${cartItemId}`).textContent.trim();
  const itemSize = document.getElementById(`size-${cartItemId}`).textContent.trim();
  const itemPrice = document.getElementById(`price-${cartItemId}`).textContent.trim();

  const modalItemDetails = document.getElementById("modal-item-details");
  modalItemDetails.innerHTML = `
    <div class="bg-[#F3F3F3] rounded-3xl w-28 p-3">
      <img src="${itemImage}" alt="${itemName}" class="w-20 h-20" />
    </div>
    <div class="flex flex-col">
      <div class="flex flex-row gap-8 justify-between">
        <h2 class="text-[#152536] font-bold text-base">${itemName}</h2>
      </div>
      <div>
        <p>${itemColor}</p>
        <p>Size: ${itemSize}</p>
      </div>
      <div class="flex flex-row justify-start items-center gap-10 pt-2 pb-2">
        <h3 class="font-bold text-base text-[#152536]">${itemPrice}</h3>
      </div>
    </div>
  `;

  document.getElementById("modal").classList.remove("hidden");
}

async function confirmRemoveItem() {
  if (!selectedCartItemId) return; 
  try {
    const response = await fetch(`${API_BASE_URL}/api/records/carts/${selectedCartItemId}`, {
      method: "DELETE",
      headers: {
        api_key: API_KEY,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to remove item from cart");
    }

    console.log(`Item with ID ${selectedCartItemId} removed from cart`);
    fetchCartItems(); 
  } catch (error) {
    console.error("Error removing item from cart:", error.message);
  } finally {
    document.getElementById("modal").classList.add("hidden"); 
    selectedCartItemId = null;
  }
}

function cancelRemove() {
  document.getElementById("modal").classList.add("hidden"); 
  selectedCartItemId = null; 
}

document.getElementById("confirmBtn").addEventListener("click", confirmRemoveItem);
document.getElementById("cancelBtn").addEventListener("click", cancelRemove);

fetchCartItems();

 
  confirmButton.addEventListener('click', () => {
    confirmRemoveItem(); 
  });
  


cancelButton.addEventListener('click', () => {
  modal.classList.add('hidden');
});
console.log(cancelButton);
checkoutButton.addEventListener('click', () => {
  
  window.location.href ="../Checkout/checkout1.html";
});



function changeCartImage(button) {
  console.log(button);
  const imgElement = button.querySelector("img");
  imgElement.src = "../../../public/assets/img/action Bar/images/cart-fill.svg";
  window.location.href = "../orders/Activecart.html";
}


function changeImageAndRedirect(button) {

  const imgElement = button.querySelector("img");
  imgElement.src = "../../../public/assets/img/action Bar/images/house-door-fill.svg";
  window.location.href = "../../pages/home/home.html";
  
  }


  function changeCartImage(button) {
    
    const imgElement = button.querySelector("img");
    imgElement.src = "../../../public/assets/img/action Bar/images/cart-fill.svg";
    window.location.href = "../orders/Activecart.html";
  }
  
  
  
  
  
  function chengwalletImg(button) {
      
    const imgElement = button.querySelector("img");
    imgElement.src ="../../../public/assets/img/action Bar/images/wallet-fill.svg";
    window.location.href ="../Checkout/checkout1.html";
  }
  
  function pofileChengimg(button) {
      
    const imgElement = button.querySelector("img");
    imgElement.src ="../../../public/assets/img/action Bar/images/person-fill.svg" ;
    window.location.href ="../profile/profile.html";
  }

  function chengwalletImg(button) {
    
    const imgElement = button.querySelector("img");
    imgElement.src ="../../../public/assets/img/action Bar/images/wallet-fill.svg";
    window.location.href ="../Checkout/checkout1.html";
  }
  
  function pofileChengimg(button) {
      
    const imgElement = button.querySelector("img");
    imgElement.src ="../../../public/assets/img/action Bar/images/person-fill.svg" ;
    window.location.href ="../profile/profile.html";
  }



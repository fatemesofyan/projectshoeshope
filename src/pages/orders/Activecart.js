
const cartContainer = document.getElementById("cart-container");

const API_KEY =
  "sofyan-124D0Wxgxrzb4clJ6OJAguR83UwqiXvtlBNvQht1ZxPjtY1NUqA7rpEoyja7yDoOWjPEm07WnuzMsa0jGNpyKoXBLRNDvAObXHXfQ70g1eyeu0Gx4Vefq57K3";

const API_BASE_URL = "http://api.alikooshesh.ir:3000";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzkwZTNmZDU4ZmE5NDQ1ZTZhOThiMCIsImlhdCI6MTczNjQyNTAxNCwiZXhwIjoxNzM2NTk3ODE0fQ.kL2mQwFIM1tGyH8IfJPkljontvYP9eQH2at0fv7Lq_g";

  
  function handleActiveTabClick() {
    console.log("Active tab clicked");
    fetchCartItems(); 
  }
  
  function handleCompletedTabClick() {
    console.log("Completed tab clicked");
    fetchCompletedOrders();

  }
  
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
      cartContainer.innerHTML = `<div class="flex flex-col justify-center items-center pt-44">
      <img
        src="../../../public/assets/img/myOrder.png"
        alt="myOrder"
        class="w-60 h-60"
      />
      <h2 class="text-[#152536] font-bold text-5xl">Not Found</h2>
      <p class="text-gray-500 text-center w-96 pt-5">
        Sorry,the keyword you entered cannot be found,please check again or
        search with another keyword.
      </p>
    </div>
`;
      document.querySelector(".font-bold.text-2xl").textContent = "$ 0.00";
      return;
    }
  
    cartItems.forEach((item) => {
      const totalPrice = (item.price * item.quantity).toFixed(2);
      totalCartPrice += parseFloat(totalPrice);
  
      cartContainer.innerHTML += `
      <div class="flex gap-4 rounded-3xl w-full shadow-md bg-white p-4">
        <div class="bg-[#F3F3F3] rounded-3xl w-32 h-32 p-3 ">
          <img id="image-${item.id}" src="${item.imageURL}" alt="${item.name}" class="w-20 h-20 flex justify-center items-center" />
        </div>

        <div class="flex flex-col w-full">
          <div class="flex flex-row gap-8 justify-between items-center">
            <h2 id="name-${item.id}" class="text-[#152536] font-bold text-base">
              ${item.name}
            </h2>
            
          </div>
          <div class="flex flex-row gap-2 text-gray-600 mt-2">
            <h3 id="color-${item.id}">${item.color || "No Color"}</h3>
            |
            <p id="size-${item.id}">Size=${item.size || "N/A"}</p>
          </div>
          <div class="rounded-lg">
              <button class="bg-[#F3F3F3] p-1 pl-2 pr-2 rounded-lg text-xs">
                In Delivery
              </button>
            </div>
          <div class="flex flex-row justify-between items-center pt-4 pb-2">
            <h3 id="price-${item.id}" class="text-black font-bold text-lg">
              $${totalPrice}
            </h3>
            
           <div class="bg-[#F3F3F3] rounded-lg">
                <button
                  class="bg-slate-950 text-white p-1 pl-4 pr-4 rounded-3xl"
                >
                  Track Order
                </button>
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
  
fetchCartItems();


async function fetchCompletedOrders() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/records/orders`, {
      method: "GET",
      headers: {
        api_key: API_KEY,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error");
    }

    const orderData = await response.json();
    renderCompletedOrders(orderData.records); 
  } catch (error) {
    console.error("Error fetching completed orders:", error.message);
    orderContainer.innerHTML = `<p>Error</p>`;
  }
}

function renderCompletedOrders(orders) {
  cartContainer.innerHTML = "";

  if (orders.length === 0) {
    cartContainer.innerHTML = `<div class="flex flex-col justify-center items-center pt-44">
      <img
        src="../../../public/assets/img/myOrder.png"
        alt="myOrder"
        class="w-60 h-60"
      />
      <h2 class="text-[#152536] font-bold text-5xl">Not Found</h2>
      <p class="text-gray-500 text-center w-96 pt-5">
        Sorry,the keyword you entered cannot be found,please check again or
        search with another keyword.
      </p>
    </div>
`;
    return;
  }

  orders.forEach((order) => {
    cartContainer.innerHTML += `
      <div class="flex gap-4 rounded-3xl w-full shadow-md bg-white p-4">
        <div class="bg-[#F3F3F3] rounded-3xl w-32 h-32 p-3 ">
          <img src="${order.imageURL}" alt="${order.name}" class="w-20 h-20 flex justify-center items-center" />
        </div>
        
        <div class="flex flex-col w-full">
        <div class="flex flex-row gap-8 justify-between items-center">
          <h2 class="text-[#152536] font-bold text-base">${order.name}</h2>
          </div>
           <div class="flex flex-row gap-2 text-gray-600 mt-2">
          <p class="text-sm text-gray-500">Color: ${order.color || "N/A"}</p>|
          <p class="text-sm text-gray-500">Size: ${order.size || "N/A"}</p>
          </div>
          <div class="rounded-lg">
              <button class="bg-[#F3F3F3] p-1 pl-2 pr-2 rounded-lg text-xs">
                Completed
              </button>
            </div>
          <div class="flex flex-row justify-between items-center pt-4 pb-2">
            <h3 class="text-[#152536] font-bold text-lg">$${order.price}</h3>
            <div class="bg-[#F3F3F3] rounded-lg">
                <button
                  class="bg-slate-950 text-white p-1 pl-4 pr-4 rounded-3xl"
                >
                  Buy Again
                </button>
              </div>
          </div>
        </div>
      </div>
    `;
  });
}





function changeImageAndRedirect(button) {

  const imgElement = button.querySelector("img");
  imgElement.src = "../../../public/assets/img/action Bar/images/house-door-fill.svg";
  window.location.href = "../../pages/home/home.html";
  
  }
  function changeCartImage(button) {
  
  const imgElement = button.querySelector("img");
  imgElement.src = "../../../public/assets/img/action Bar/images/handbag-fill.svg";
  window.location.href = "../../pages/Cart/mycart.html";
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

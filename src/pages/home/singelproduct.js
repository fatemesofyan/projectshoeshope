const API_KEY =
  "sofyan-124D0Wxgxrzb4clJ6OJAguR83UwqiXvtlBNvQht1ZxPjtY1NUqA7rpEoyja7yDoOWjPEm07WnuzMsa0jGNpyKoXBLRNDvAObXHXfQ70g1eyeu0Gx4Vefq57K3";

const API_BASE_URL = "http://api.alikooshesh.ir:3000";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzkwZTNmZDU4ZmE5NDQ1ZTZhOThiMCIsImlhdCI6MTczNjI1MDczNiwiZXhwIjoxNzM2NDIzNTM2fQ.3oEeD9x7L5b5xwx28-kWmbSg3GNNWKw_D_G8XWSafbs";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

if (!productId) {
  console.error("Product ID not found in URL");
} else {
  console.log("Product ID:", productId);

  async function fetchProductDetails(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/records/products/${productId}`, {
        method: "GET",
        headers: {
          api_key: API_KEY,
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }

      const product = await response.json();
      console.log("Product Details:", product);

      const unitPrice = product.price;

      renderProductDetails(product);

      let quantity = 0;
      let totalPrice = quantity * unitPrice;

      const totalPriceElement = document.getElementById('product-price');
      if (totalPriceElement) {
        totalPriceElement.textContent = `$ ${totalPrice.toFixed(2)}`;
      } else {
        console.error("Total price element not found");
      }

      function updateTotalPrice() {
        totalPrice = quantity * unitPrice;
        totalPriceElement.textContent = `$ ${totalPrice.toFixed(2)}`;
      }

      const decreaseButton = document.getElementById('decrease-btn');
      const increaseButton = document.getElementById('increase-btn');
      const quantitySpan = document.getElementById('quantity');

      if (decreaseButton && increaseButton && quantitySpan) {
        decreaseButton.addEventListener('click', () => {
          if (quantity > 0) {
            quantity--;
            quantitySpan.textContent = quantity;
            updateTotalPrice();
          }
        });

        increaseButton.addEventListener('click', () => {
          quantity++;
          quantitySpan.textContent = quantity;
          updateTotalPrice();
        });
      } else {
        console.error("Elements for buttons or quantity not found");
      }

    } catch (error) {
      console.error("Error fetching product details:", error.message);
    }
  }

  function renderProductDetails(product) {
    document.getElementById("product-image-container").innerHTML = `
      <div class="flex justify-center">
        <img
          src="${product.imageURL[0]}"
          alt="${product.name}"
          class="w-72 h-72"
        />
      </div>
    `;

    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-description").textContent =
      product.description || "No description available.";
    document.getElementById("product-price").textContent = `$${product.price}`;

    const likeButton = document.querySelector('button[onclick="toggleLike(this)"]');
    if (likeButton) {
      likeButton.dataset.product = JSON.stringify({
        id: product.id,
        name: product.name,
        price: product.price,
        imageURL: product.imageURL[0], 
      });
    }


    const detailsContainer = document.getElementById("product-details");
    detailsContainer.innerHTML = `
      <div>
        <h3 class="font-bold text-lg text-[#152536]">Size</h3>
        <div class="flex flex-row gap-2">
          ${product.sizes
            .map(
              (size) =>
                `<button class="border-2 border-solid border-gray-600 text-gray-600 rounded-full p-1 hover:bg-[#152536] hover:text-white hover:border-[#152536]">${size}</button>`
            )
            .join("")}
        </div>
      </div>
      <div>
        <h3 class="font-bold text-lg text-[#152536]">Color</h3>
        <div class="flex gap-2">
          ${product.colors
            .map(
              (color) =>
                `<button class="w-9 h-9 rounded-full border-2 " style="background-color: ${color}"></button>`
            )
            .join("")}
        </div>
      </div>
    `;
  }

  fetchProductDetails(productId);
}

const addToCartButton = document.getElementById("addtoCart");
let selectedSize = null;
let selectedColor = null;

// مدیریت انتخاب سایز
document.getElementById("product-details").addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON" && event.target.textContent.trim()) {
    const sizeButtons = document.querySelectorAll("#product-details button");
    sizeButtons.forEach((btn) => btn.classList.remove("bg-[#152536]", "text-white"));
    event.target.classList.add("bg-[#152536]", "text-white");
    selectedSize = event.target.textContent.trim(); // ذخیره سایز انتخاب‌شده
    console.log("Selected Size:", selectedSize);
  }
});

// مدیریت انتخاب رنگ
document.getElementById("product-details").addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON" && event.target.style.backgroundColor) {
    const colorButtons = document.querySelectorAll("#product-details button");
    colorButtons.forEach((btn) => btn.style.outline = "");
    event.target.style.outline = "3px solid black"; // نشان دادن رنگ انتخاب‌شده
    selectedColor = event.target.style.backgroundColor; // ذخیره رنگ انتخاب‌شده
    console.log("Selected Color:", selectedColor);
  }
});

addToCartButton.addEventListener("click", async () => {
  try {
    if (!selectedSize || !selectedColor) {
      alert("Please select a size and color before adding to cart.");
      return;
    }

    const productId = urlParams.get("id");
    const quantitySpan = document.getElementById("quantity");
    const quantity = parseInt(quantitySpan.textContent, 10);

    const productResponse = await fetch(`${API_BASE_URL}/api/records/products/${productId}`, {
      method: "GET",
      headers: {
        api_key: API_KEY,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!productResponse.ok) {
      throw new Error("Failed to fetch product details for cart");
    }

    const product = await productResponse.json();

    const cartData = {
      product_id: product.id,
      name: product.name,
      imageURL: product.imageURL[0],
      price: product.price,  // Only send the unit price
      quantity: quantity,    // Send the quantity as well
      size: selectedSize,    // اضافه کردن سایز انتخاب‌شده
      color: selectedColor,  // اضافه کردن رنگ انتخاب‌شده
    };

    const cartResponse = await fetch(`${API_BASE_URL}/api/records/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        api_key: API_KEY,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(cartData),
    });

    if (!cartResponse.ok) {
      const errorData = await cartResponse.json();
      console.error("Server response:", errorData);
      throw new Error("Failed to add product to cart");
    }

    const addedToCart = await cartResponse.json();
    console.log("Product successfully added to cart:", addedToCart);

    
    // window.location.href = "../Cart/mycart.html";
  } catch (error) {
    console.error("Error adding product to cart:", error.message);
   
  }
});




async function getWishlist() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/records/wishlist`, {
      method: "GET",
      headers: {
        api_key: API_KEY,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch wishlist");
    }

    const wishlist = await response.json();
    console.log("Fetched wishlist:", wishlist);
    return wishlist.records;  
  } catch (error) {
    console.error("Error fetching wishlist:", error.message);
    return [];
  }
}

async function addToWishlist(product) {
  try {
    console.log("Adding product to wishlist: **********", product);

    const response = await fetch(`${API_BASE_URL}/api/records/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        api_key: API_KEY,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        product_id: product.id, 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server response:", errorData);
      throw new Error("Failed to add product to wishlist");
    }

    const addedProduct = await response.json();
    console.log("Product successfully added to wishlist:", addedProduct);
    return addedProduct; 
  } catch (error) {
    console.error("Error adding product to wishlist:", error.message);
  }
}

async function removeFromWishlist(productId) {
 
  try {

      console.log("Removing product with ID:", productId);

      const response = await fetch(`${API_BASE_URL}/api/records/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
          api_key: API_KEY,
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        console.error("Server response:", errorData);
        throw new Error("Failed to remove product from wishlist");
      }

      console.log("Product successfully removed from wishlist");
    
  } catch (error) {
    console.error("Error removing product from wishlist:", error.message);
    throw error;  
  }
}

async function toggleLike(button) {
  const heartImage = button.querySelector("img");

  if (!button.dataset.product) {
    console.error("Product data is missing:", button.dataset.product);
    alert("Product information is missing. Please try again later.");
    return;
  }

  const product = JSON.parse(button.dataset.product);
  console.log("Product data for wishlist: &&&&&&&&", product.id);

  try {
    
    const wishlist = await getWishlist();
    console.log(wishlist + ")))))))))))))");
    const isAdded = wishlist.find((item) => item.product_id === product.id);

    console.log(isAdded + "ooooooooooooooooooo");
    if (isAdded) {
      await removeFromWishlist(isAdded.id); 
      heartImage.src = "https://example.com/assets/img/heart (1).png"; 
      button.dataset.added = "false";
      console.log("Product removed from wishlist");
    } else {
      await addToWishlist(product);
      heartImage.src ="../../../public/assets/img/like-svgrepo-com.svg"; 
      button.dataset.added = "true";
      console.log("Product added to wishlist");
    }

    const updatedWishlist = await getWishlist();
    console.log("Updated wishlist:", updatedWishlist);

  } catch (error) {
    console.error("Error toggling like:", error.message);
  }
}





const backArrow = document.getElementById("back-arrow");
const backdrop = document.getElementById("loading-backdrop");

backArrow.addEventListener("click", () => {
  backdrop.classList.remove("hidden");

  setTimeout(() => {
    window.location.href = "../home/home.html";
  }, 2000); 

  setTimeout(() => {
    backdrop.classList.add("hidden");
  }, 2500); 
});



// function toggleLike(button) {
   
//   const imgElement = button.querySelector("img");
//   imgElement.src = "../../../public/assets/img/like-svgrepo-com.svg";
 
// }
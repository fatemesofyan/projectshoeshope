// اطلاعات پایه برای API
const API_KEY =
  "sofyan-124D0Wxgxrzb4clJ6OJAguR83UwqiXvtlBNvQht1ZxPjtY1NUqA7rpEoyja7yDoOWjPEm07WnuzMsa0jGNpyKoXBLRNDvAObXHXfQ70g1eyeu0Gx4Vefq57K3";

const API_BASE_URL = "http://api.alikooshesh.ir:3000";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzkwZTNmZDU4ZmE5NDQ1ZTZhOThiMCIsImlhdCI6MTczNjA3NjgyMywiZXhwIjoxNzM2MjQ5NjIzfQ.Et8_s2Tl9N5rkawkpr7XXK0wPDpHyJ_FpOEF8abyM9k";

// دریافت ID محصول از URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

if (!productId) {
  console.error("Product ID not found in URL");
} else {
  console.log("Product ID:", productId);

  // دریافت اطلاعات محصول
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

      // تعریف قیمت هر واحد از API
      const unitPrice = product.price;

      // نمایش اطلاعات محصول در صفحه
      renderProductDetails(product);

      // مقدار اولیه تعداد و قیمت کل
      let quantity = 1; // مقدار پیش‌فرض تعداد محصول
      let totalPrice = quantity * unitPrice;

      // نمایش مقدار اولیه قیمت
      const totalPriceElement = document.getElementById('product-price');
      if (totalPriceElement) {
        totalPriceElement.textContent = `$ ${totalPrice.toFixed(2)}`;
      } else {
        console.error("Total price element not found");
      }

      // تابع به‌روزرسانی قیمت
      function updateTotalPrice() {
        totalPrice = quantity * unitPrice;
        totalPriceElement.textContent = `$ ${totalPrice.toFixed(2)}`;
      }

      // دکمه کاهش مقدار
      const decreaseButton = document.getElementById('decrease-btn');
      const increaseButton = document.getElementById('increase-btn');
      const quantitySpan = document.getElementById('quantity');

      if (decreaseButton && increaseButton && quantitySpan) {
        // دکمه کاهش مقدار
        decreaseButton.addEventListener('click', () => {
          if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
            updateTotalPrice();
          }
        });

        // دکمه افزایش مقدار
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

  // تابع برای نمایش جزئیات محصول
  function renderProductDetails(product) {
    document.getElementById("product-image-container").innerHTML = `
      <div class="flex justify-center">
        <img
          src="${product.imageURL}"
          alt="${product.name}"
          class="w-72 h-72"
        />
      </div>
    `;

    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-description").textContent =
      product.description || "No description available.";
    document.getElementById("product-price").textContent = `$${product.price}`;

    // نمایش اندازه‌ها و رنگ‌ها
    const detailsContainer = document.getElementById("product-details");
    detailsContainer.innerHTML = `
      <div>
        <h3 class="font-bold text-lg text-[#152536]">Size</h3>
        <div class="flex flex-row gap-2">
          ${product.sizes
            .map(
              (size) =>
                `<button class="border-2 border-solid border-gray-600 text-gray-600 rounded-full p-2 hover:bg-[#152536] hover:text-white hover:border-[#152536]">${size}</button>`
            )
            .join("")}
        </div>
      </div>
      <div>
        <h3 class="font-bold text-lg text-[#152536]">Color</h3>
        <div class="flex gap-4">
          ${product.colors
            .map(
              (color) =>
                `<button class="w-9 h-9 rounded-full" style="background-color: ${color}"></button>`
            )
            .join("")}
        </div>
      </div>
    `;
  }

  // فراخوانی تابع برای دریافت اطلاعات محصول
  fetchProductDetails(productId);
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
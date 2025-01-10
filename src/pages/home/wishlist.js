const API_KEY =
  "sofyan-124D0Wxgxrzb4clJ6OJAguR83UwqiXvtlBNvQht1ZxPjtY1NUqA7rpEoyja7yDoOWjPEm07WnuzMsa0jGNpyKoXBLRNDvAObXHXfQ70g1eyeu0Gx4Vefq57K3";

const API_BASE_URL = "http://api.alikooshesh.ir:3000";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzkwZTNmZDU4ZmE5NDQ1ZTZhOThiMCIsImlhdCI6MTczNjMyNTc3NCwiZXhwIjoxNzM2NDk4NTc0fQ.EQn1qizjiiu7VsLlLb2B0GdgBeJe8oVffpCqjGizMVs";



  const wishlistContainer = document.getElementById("wishlist-container");

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
  
  async function getProductList() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/records/products`, {
        method: "GET",
        headers: {
          api_key: API_KEY,
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch product list");
      }
  
      const result = await response.json();
      console.log("Fetched products:", result);
      return result.records;
    } catch (error) {
      console.error("Error fetching product list:", error.message);
      return [];
    }
  }
  
  async function renderProducts() {
    try {
      const wishlistProducts = await getWishlist();
      const allProducts = await getProductList();
  
      const products = wishlistProducts
        .map((product) => allProducts.find((item) => item.id === product.product_id))
        .filter(Boolean); 
  
      console.log("Wishlist products:", products);
  
      wishlistContainer.innerHTML = "";
  
      products.forEach((product) => {
        wishlistContainer.innerHTML += `
         <a href="../home/homepagesingelprodact.html?id=${product.id}"><div class="pb-4 ">
          <div class="relative">
            <img
              src="${product.imageURL[0] || product.imageURL}" 
              alt="${product.name}" 
              class="w-48 h-48 rounded-2xl"
            />
<div class="absolute top-4 right-6">
          <img src="../../../public/assets/img/wishlist-like-svgrepo-com (1).svg" alt="wishlist-like" class="w-8 h-8">
        </div>
        </div>
            <h3 class="text-[#152536] font-bold">${product.name}</h3>
            <p>$ ${product.price}</p>

          </div></a>`;
      });
    } catch (error) {
      console.error("Error rendering products:", error.message);
    }
  }
  
  
  renderProducts();
  
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
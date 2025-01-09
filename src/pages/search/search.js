const searchButton = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const productsContainer = document.getElementById("products");

const resultHeader = document.getElementById("resultHeader");
const notFoundMessage = document.getElementById("notFoundMessage");

const resultsSearch = document.getElementById("resultSearch");

const API_KEY =
  "sofyan-124D0Wxgxrzb4clJ6OJAguR83UwqiXvtlBNvQht1ZxPjtY1NUqA7rpEoyja7yDoOWjPEm07WnuzMsa0jGNpyKoXBLRNDvAObXHXfQ70g1eyeu0Gx4Vefq57K3";

const API_BASE_URL = "http://api.alikooshesh.ir:3000";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzkwZTNmZDU4ZmE5NDQ1ZTZhOThiMCIsImlhdCI6MTczNjMyNTc3NCwiZXhwIjoxNzM2NDk4NTc0fQ.EQn1qizjiiu7VsLlLb2B0GdgBeJe8oVffpCqjGizMVs";

function saveSearchHistory(query) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!history.includes(query)) {
    history.unshift(query);
    if (history.length > 10) history.pop();
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
}

function renderHistory() {
  const recentContainer = document.getElementById("recentSearches");
  const clearButton = document.getElementById("clearHistoryBtn");
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  if (history.length === 0) {
    recentContainer.innerHTML =
      "<p class='text-gray-500 text-center'>No recent searches</p>";
    recentContainer.style.display = "block";
    clearButton.style.display = "none";
    return;
  }

  recentContainer.innerHTML = history
    .map(
      (query) => `
        <div class="flex flex-row justify-between pr-8 pl-6 pt-5">
          <h3 class="text-gray-500">${query}</h3>
          <button onclick="removeFromHistory('${query}')">
            <img src="../../../public/assets/img/Close Square.svg" alt="Close">
          </button>
        </div>
      `
    )
    .join("");
  recentContainer.style.display = "block";
  clearButton.style.display = "block";
}

function removeFromHistory(query) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  history = history.filter((item) => item !== query);
  localStorage.setItem("searchHistory", JSON.stringify(history));
  renderHistory();
}

function clearHistory() {
  localStorage.removeItem("searchHistory");
  renderHistory();
}

async function searchProducts(query) {
  try {
    if (!query || query.trim() === "") {
      console.error("Query is empty or invalid.");
      return;
    }

    saveSearchHistory(query);

    document.getElementById("recentSearches").style.display = "none";
    document.getElementById("clearHistoryBtn").style.display = "none";

    const url = `${API_BASE_URL}/api/records/products?searchKey=name&searchValue=${query}`;
    console.log("Request URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        api_key: API_KEY,
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("API Error Details:", errorDetails);
      throw new Error("Failed to fetch products");
    }

    const result = await response.json();

    resultHeader.innerHTML = `
      <h2 class="text-[#152536] font-bold text-xl">Results for "${query}"</h2>
      <h2 class="text-[#152536] font-bold text-xl">${result.records.length} found</h2>
    `;

    if (!result.records || result.records.length === 0) {
      console.warn("No products found for the given query.");
      productsContainer.style.display = "none";
      productsContainer.innerHTML = "";
      notFoundMessage.innerHTML = `
        <img src="../../../public/assets/img/myOrder.png" alt="myOrder" class="w-60 h-60">
        <h2 class="text-[#152536] font-bold text-5xl">Not Found</h2>
        <p class="text-gray-500 text-center w-96 pt-5">Sorry, the keyword you entered cannot be found, please check again or search with another keyword.</p>
      `;
      return;
    }

    renderProduct(result.records);
    notFoundMessage.innerHTML = "";
    productsContainer.style.display = "block";
  } catch (error) {
    console.error(`Error: ${error.message}`);
    productsContainer.innerHTML = "<p>Error products.</p>";
  }
}

function renderProduct(products) {
  console.log(products);
  productsContainer.innerHTML = products
    .map(
      (element) => `
        <a href="../home/homepagesingelprodact.html?id=${element.id}">
          <div>
            <img src="${element.imageURL[0]}" alt="puma" class="w-48 h-48 rounded-2xl" />
            <h3 class="text-[#152536] font-bold">${element.name}</h3>
            <p><span>$</span>${element.price}</p>
          </div>
        </a>
      `
    )
    .join("");

  setTimeout(() => {
    productsContainer.style.display = "grid";
  }, 0);
}

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  searchProducts(query);
});

document
  .getElementById("clearHistoryBtn")
  .addEventListener("click", clearHistory);

document.addEventListener("DOMContentLoaded", renderHistory);
document.getElementById("recentSearches").style.display = "none";
document.getElementById("clearHistoryBtn").style.display = "none";
productsContainer.style.display = "none";

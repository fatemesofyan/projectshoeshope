const product = document.getElementById("products");

const API_KEY =
  "sofyan-124D0Wxgxrzb4clJ6OJAguR83UwqiXvtlBNvQht1ZxPjtY1NUqA7rpEoyja7yDoOWjPEm07WnuzMsa0jGNpyKoXBLRNDvAObXHXfQ70g1eyeu0Gx4Vefq57K3";

const API_BASE_URL = "http://api.alikooshesh.ir:3000";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzkwZTNmZDU4ZmE5NDQ1ZTZhOThiMCIsImlhdCI6MTczNjI1MDczNiwiZXhwIjoxNzM2NDIzNTM2fQ.3oEeD9x7L5b5xwx28-kWmbSg3GNNWKw_D_G8XWSafbs";

  window.addEventListener("DOMContentLoaded", () => {
    const selectedBrand = localStorage.getItem("selectedBrand");
  
    if (selectedBrand === "NIKE") {
      getproductListNlike();
    } else if (selectedBrand === "ADIDAS") {
      getproductListAdidas();
    }else if(selectedBrand === "PUMA") {
        getproductListPuma();
      }else if(selectedBrand === "ASICS") {
        getproductListAsics();
      }else if(selectedBrand === "REEBOK") {
        getproductListReebok();
      }else if(selectedBrand === "NEWBALANCE") {
        getproductListNewba();
      }else if(selectedBrand === "CONVERSE") {
        getproductListConverse();
      }
  });
  
  async function getproductListNlike() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/records/products?filterKey=brand&filterValue=NIKE`,
        {
          method: "GET",
          headers: {
            api_key: API_KEY,
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error fetching Nike products");
      }
      const result = await response.json();
      renderProduct(result.records);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
  

  async function getproductListAdidas() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/records/products?filterKey=brand&filterValue=ADIDAS`,
        {
          method: "GET",
          headers: {
            api_key: API_KEY,
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("has error");
      }
      const result = await response.json();
      console.log(result);
      
      renderProduct(result.records);
      return result;
    } catch (error) {
      console.log(`from catch:${error.message}`);
    }
  }

  async function getproductListPuma() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/records/products?filterKey=brand&filterValue=PUMA`,
        {
          method: "GET",
          headers: {
            api_key: API_KEY,
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("has error");
      }
      const result = await response.json();
      console.log(result);
      
      renderProduct(result.records);
      return result;
    } catch (error) {
      console.log(`from catch:${error.message}`);
    }
  }
  
  
  async function getproductListAsics() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/records/products?filterKey=brand&filterValue=ASICS`,
        {
          method: "GET",
          headers: {
            api_key: API_KEY,
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("has error");
      }
      const result = await response.json();
      console.log(result);
      
      renderProduct(result.records);
      return result;
    } catch (error) {
      console.log(`from catch:${error.message}`);
    }
  }
  
  
  async function getproductListReebok() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/records/products?filterKey=brand&filterValue=REEBOK`,
        {
          method: "GET",
          headers: {
            api_key: API_KEY,
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("has error");
      }
      const result = await response.json();
      console.log(result);
      
      renderProduct(result.records);
      return result;
    } catch (error) {
      console.log(`from catch:${error.message}`);
    }
  }
  
  
  async function getproductListNewba() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/records/products?filterKey=brand&filterValue=NEW BALANCE`,
        {
          method: "GET",
          headers: {
            api_key: API_KEY,
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("has error");
      }
      const result = await response.json();
      console.log(result);
      
      renderProduct(result.records);
      return result;
    } catch (error) {
      console.log(`from catch:${error.message}`);
    }
  }
  
  
  async function getproductListConverse() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/records/products?filterKey=brand&filterValue=CONVERSE`,
        {
          method: "GET",
          headers: {
            api_key: API_KEY,
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("has error");
      }
      const result = await response.json();
      console.log(result);
      
      renderProduct(result.records);
      return result;
    } catch (error) {
      console.log(`from catch:${error.message}`);
    }
  }
  
  
  function renderProduct(product) {
    console.log(product);
    products.innerHTML = "";
    products.innerHTML = product
      .map((element) => {
        return `<a href="../home/homepagesingelprodact.html?id=${element.id}"><div>
          <img
            src="${element.imageURL[0]}"
            alt="puma"
            class="w-48 h-48 rounded-2xl"
          />
          <h3 class="text-[#152536] font-bold">${element.name}</h3>
          <p><span>$</span>${element.price}</p>
        </div></a>`;
      })
      .join("");
  }


  function renderProduct(product) {
    products.innerHTML = product
      .map((element) => {
        return `
          <a href="../home/homepagesingelprodact.html?id=${element.id}">
            <div>
              <img src="${element.imageURL[0]}" alt="${element.name}" class="w-48 h-48 rounded-2xl" />
              <h3 class="text-[#152536] font-bold">${element.name}</h3>
              <p><span>$</span>${element.price}</p>
            </div>
          </a>`;
      })
      .join("");
      
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
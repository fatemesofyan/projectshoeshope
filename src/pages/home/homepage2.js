const products = document.getElementById("products");
const allProductsBtn = document.getElementById("all-products-btn");
const nikeProductsBtn = document.getElementById("nike-products-btn");
const adidasProductsBtn = document.getElementById("adidas-products-btn");
const pumaProductsBtn = document.getElementById("puma-products-btn");
const asiceProductsBtn = document.getElementById("asics-products-btn");
const reebokProductsBtn = document.getElementById("reebok-products-btn");
const newbaProductsBtn = document.getElementById("newba-products-btn");
const onverseProductsBtn = document.getElementById("onverse-products-btn");


const API_KEY =
  "sofyan-124D0Wxgxrzb4clJ6OJAguR83UwqiXvtlBNvQht1ZxPjtY1NUqA7rpEoyja7yDoOWjPEm07WnuzMsa0jGNpyKoXBLRNDvAObXHXfQ70g1eyeu0Gx4Vefq57K3";

const API_BASE_URL = "http://api.alikooshesh.ir:3000";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzkwZTNmZDU4ZmE5NDQ1ZTZhOThiMCIsImlhdCI6MTczNjI1MDczNiwiZXhwIjoxNzM2NDIzNTM2fQ.3oEeD9x7L5b5xwx28-kWmbSg3GNNWKw_D_G8XWSafbs";



  async function getproductList() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/records/products`, {
        method: "GET",
        headers: {
          api_key: API_KEY,
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
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
  
  
  allProductsBtn.addEventListener("click", () => {
    getproductList();
  });
  
  nikeProductsBtn.addEventListener("click", () => {
    getproductListNlike();
  });
  
  adidasProductsBtn.addEventListener("click",()=>{
  getproductListAdidas();
  });
  
  pumaProductsBtn.addEventListener("click",()=>{
  getproductListPuma();
  });
  
  asiceProductsBtn.addEventListener("click",()=>{
    getproductListAsics();
  });
  
  reebokProductsBtn.addEventListener("click",()=>{
    getproductListReebok();
  });
  
  newbaProductsBtn.addEventListener("click",()=>{
    getproductListNewba();
  });
  
  onverseProductsBtn.addEventListener("click",()=>{
    getproductListConverse();
  });
  
  getproductList();


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
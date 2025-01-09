const products = document.getElementById("products");
const allProductsBtn = document.getElementById("all-products-btn");
const nikeProductsBtn = document.getElementById("nike-products-btn");
const adidasProductsBtn = document.getElementById("adidas-products-btn");
const pumaProductsBtn = document.getElementById("puma-products-btn");
const asiceProductsBtn = document.getElementById("asics-products-btn");
const reebokProductsBtn = document.getElementById("reebok-products-btn");
const newbaProductsBtn = document.getElementById("newba-products-btn");
const onverseProductsBtn = document.getElementById("onverse-products-btn");

const nikeButton = document.getElementById("nike-button");
const adidasButton = document.getElementById("adidas-button");
const pumaButton = document.getElementById("puma-button");
const asicsButton = document.getElementById("asics-button");
const reebokButton = document.getElementById("reebok-button");
const newbaButton = document.getElementById("newba-button");
const converseButton = document.getElementById("converse-button");
const moreButton = document.getElementById("more-button");

const SeeAllButton = document.getElementById("See-all");

const searchInput=document.getElementById("searchInput");

const likelist=document.getElementById("likelist");






const API_KEY =
  "sofyan-124D0Wxgxrzb4clJ6OJAguR83UwqiXvtlBNvQht1ZxPjtY1NUqA7rpEoyja7yDoOWjPEm07WnuzMsa0jGNpyKoXBLRNDvAObXHXfQ70g1eyeu0Gx4Vefq57K3";

const API_BASE_URL = "http://api.alikooshesh.ir:3000";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzkwZTNmZDU4ZmE5NDQ1ZTZhOThiMCIsImlhdCI6MTczNjMyNTc3NCwiZXhwIjoxNzM2NDk4NTc0fQ.EQn1qizjiiu7VsLlLb2B0GdgBeJe8oVffpCqjGizMVs";




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



nikeButton.addEventListener("click", () => {
  
  localStorage.setItem("selectedBrand", "NIKE");
  console.log("Selected brand set to NIKE");
  window.location.href = "../../pages/home/homepages3.html";
});

adidasButton.addEventListener("click",()=>{
  localStorage.setItem("selectedBrand", "ADIDAS");
  console.log("Selected brand set to ADIDAS");
  window.location.href = "../../pages/home/homepages3.html";

});


pumaButton.addEventListener("click",()=>{
  localStorage.setItem("selectedBrand", "PUMA");

  window.location.href = "../../pages/home/homepages3.html";

});

asicsButton.addEventListener("click",()=>{
  localStorage.setItem("selectedBrand", "ASICS");

  window.location.href = "../../pages/home/homepages3.html";

});

reebokButton.addEventListener("click",()=>{
  localStorage.setItem("selectedBrand", "REEBOK");

  window.location.href = "../../pages/home/homepages3.html";

});

newbaButton.addEventListener("click",()=>{
  localStorage.setItem("selectedBrand", "NEWBALANCE");

  window.location.href = "../../pages/home/homepages3.html";

});

converseButton.addEventListener("click",()=>{
  localStorage.setItem("selectedBrand", "CONVERSE");

  window.location.href = "../../pages/home/homepages3.html";

});

SeeAllButton.addEventListener("click",()=>{
  localStorage.setItem("selectedBrand", "SEEALL");
  window.location.href="../../pages/home/homepage2.html"
});


searchInput.addEventListener("click",()=>{
   window.location.href="../../pages/search/resultsearch.html"
});


likelist.addEventListener("click",()=>{
  window.location.href="../home/wishlist.html" 
})

function changeCartImage(button) {
    
  const imgElement = button.querySelector("img");
  imgElement.src = "../../../public/assets/img/action Bar/images/cart-fill.svg";
  window.location.href = "../orders/Activecart.html";
}



function changeCart(button) {
    
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

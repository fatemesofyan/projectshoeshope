 export const API_KEY =
  "sofyan-124D0Wxgxrzb4clJ6OJAguR83UwqiXvtlBNvQht1ZxPjtY1NUqA7rpEoyja7yDoOWjPEm07WnuzMsa0jGNpyKoXBLRNDvAObXHXfQ70g1eyeu0Gx4Vefq57K3";

export const API_BASE_URL = "http://api.alikooshesh.ir:3000"; 


export const ACCESS_TOKEN = ()=> {
  const token = localStorage.getItem("token")
  return token
}
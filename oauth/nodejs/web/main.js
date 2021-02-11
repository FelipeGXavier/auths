const API_URL = "http://localhost:3000/api";
const reference = document.getElementById("container");

const loginData = {
  login: document.getElementById("login").innerHTML,
  password: document.getElementById("password").innerHTML,
};

async function login() {
  const basic = await fetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify(loginData),
  });
  localStorage.setItem('basic', basic);
}

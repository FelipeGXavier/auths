const API_URL = "http://localhost:3000/api";

const reference = document.getElementById("container");
const loginBtn = document.getElementById("signin");

import { renderDashboardPage } from './dashboard.js';

const loginData = {
  login: document.getElementById("login"),
  password: document.getElementById("password"),
};

loginBtn.addEventListener('click', function login(event) {
  event.preventDefault();
  fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      email: loginData.login.value,
      password: loginData.password.value
    }),
  })
  .then(result => result.json())
  .then(data => {
    localStorage.setItem('basic', data.basic);
    reference.innerHTML = renderDashboardPage();
  }).catch(err => alert('Erro ao efetuar Login'));
});




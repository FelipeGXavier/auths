import { renderDashboardPage } from './dashboard.js';
import * as oauth from './google.js';

const API_URL = "http://localhost:3000/api";

const reference = document.getElementById("container");
const loginBtn = document.getElementById("signin");

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
    
    const googleBtn = document.querySelector('.google');
    const calendarBtn = document.querySelector('.calendar');;
    const logoutBtn = document.querySelector('.logout');

    googleBtn.addEventListener('click', oauth.authCode);
    logoutBtn.addEventListener('click', oauth.logout);
    calendarBtn.addEventListener('click', oauth.listEvents);
  }).catch(err => alert('Erro ao efetuar Login'));
});




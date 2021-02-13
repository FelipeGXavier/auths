import { renderEvents } from "./dashboard.js";

const API_URL = "http://localhost:3000/api";

export function authCode(event) {
  event.preventDefault();
  gapi.auth2
    .getAuthInstance()
    .grantOfflineAccess()
    .then((result) => {
      fetch(`${API_URL}/oauth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });
    });
}

export function listEvents(event) {
  event.preventDefault();
  const reference = document.getElementById("container");
  fetch(`${API_URL}/events`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((data) => {
      if (!document.querySelector("ul")) {
        reference.insertAdjacentHTML("beforeend", renderEvents(data.events));
      }
    });
}

export function logout(event) {
  event.preventDefault();
  fetch(`${API_URL}/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  localStorage.removeItem("basic");
  location.reload();
}

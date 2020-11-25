import React from "react";

const BACKEND_AUTH_URL = "http://localhost:8080/auth"
const authBody = (username, password) => {
  return {
    "username": username,
    "password": password
  };
}

export const loginApi = (username, password) =>{
  const bodyContent = authBody(username, password);
  return fetch(BACKEND_AUTH_URL + `/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json;charset=UTF-8"},
    body:JSON.stringify(bodyContent)

  })
    .then(response => response.json())
}

export const register = (username, password) => {
  const bodyContent = authBody(username, password);
  return fetch(BACKEND_AUTH_URL + `/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json;charset=UTF-8"},
    body: JSON.stringify(bodyContent)
  })
    .then(() => loginApi(username, password))
}

export const logout = () => {
  if(localStorage.getItem("accessToken")!= null) {
    localStorage.removeItem("accessToken");
  }
  if(localStorage.getItem("roles")!= null) {
    localStorage.removeItem("roles");
  }
}



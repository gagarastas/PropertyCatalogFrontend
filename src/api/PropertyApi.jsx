import React from "react";

const BACKEND_URL = "http://localhost:8080";

const propertyBody = (propertyType, address, description, information, convenience) => {
  return {
    "type": propertyType,
    "address": address,
    "description": description,
    "information":information,
    "convenience": convenience,
  }
}

export const getAllProperty = () => {
  return fetch(BACKEND_URL + `/allProperty`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    },
  })
    .then(response => response.json())
}

export const getProperty = (id) =>{
  return fetch(BACKEND_URL + `/property/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    },
  })
    .then(response => response.json())
}

export const deleteProperty = (propertyId) => {
  return fetch(BACKEND_URL + `/deleteProperty/${propertyId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    },
  })
    .then(response => response.text())
}


export const sendNewProperty = (propertyType, address, description, information, convenience) => {
  const bodyContent = propertyBody(propertyType, address, description, information, convenience)
  return fetch(BACKEND_URL + `/addProperty`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    },
    body: JSON.stringify(bodyContent)
  })
}

export const sendUpdateProperty = (id, propertyType, address, description, information, convenience) => {
  const bodyContent = propertyBody(propertyType, address, description, information, convenience)
  return fetch(BACKEND_URL + `/updateProperty/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    },
    body: JSON.stringify(bodyContent)
  })
}

export const addPhotos = (photos, propertyId) =>{
  let formData = new FormData();
  photos.forEach((item, array) =>{
    formData.append("photo", item)
  })
  return fetch(BACKEND_URL + `/addPhotos/${propertyId}`, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("accessToken")
    },
    body: formData
  })
    .then(msg => msg.text())
}

export const getPhoto = (photoId) => {
    return fetch(BACKEND_URL + `/getPhoto/${photoId}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("accessToken")
      }
    })
      .then(response => response.blob())
      .then(image => image.size > 0 ? window.URL.createObjectURL(image) : null);
}
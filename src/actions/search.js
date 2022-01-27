import fetch from "isomorphic-fetch";
import { API_URL } from "../secrets";

// This Route will search for a particular Video.
export const videoSearch = (data) => {
  return fetch(`${API_URL}/video/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// This Route will search for a particular User.
export const userSearch = (data) => {
  return fetch(`${API_URL}/user/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

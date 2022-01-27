import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
import { API_URL } from "../secrets";

// This Sign-in route will help to send the User details in JSON format to Database for checking.
export const signin = (data) => {
  return fetch(`${API_URL}/user/signin`, {
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

// This Sign-up route will help to GET and then send the User details in JSON format to Database for storing it for Future Sign-in.
export const signup = (user) => {
  return fetch(`${API_URL}/user/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// Getting the cookies
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

// Accessing the Localstorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

// Autheticate user by pass data to Cookie and Localstorage
export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

// This Sign-out route will remove the Cookie and the Token stored in Local Storage for the User.
export const signout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();

  return fetch(`${API_URL}/user/signout`, {
    method: "GET",
  })
    .then((response) => {
      console.log("signout success");
    })
    .catch((err) => console.log(err));
};

import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

const options = {
  ignoreHeaders: true 
}

export const clientSocial = applyCaseMiddleware(axios.create({
  // baseURL: "http://localhost:3001/",
  baseURL: process.env.NODE_ENV === "production" ? "https://api.meruplanet.com/" : "http://localhost:3001/",
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
}), options)
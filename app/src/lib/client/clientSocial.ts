import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

const options = {
  ignoreHeaders: true 
}

const clientSocial = applyCaseMiddleware(axios.create({
  // baseURL: "http://localhost:3001/",
  // baseURL: process.env.NODE_ENV === "production" ? "https://api.meruplanet.com/" : "http://localhost:3001/",
  baseURL: process.env.NODE_ENV === "production" ? "https://api.anime-tier.com/" : "http://localhost:3001/",
  withCredentials: true,
  // headers: { 'X-Requested-With': 'XMLHttpRequest' },
}), options)

// clientSocial.defaults.xsrfCookieName = 'CSRF-TOKEN'
// clientSocial.defaults.xsrfHeaderName = 'X-CSRF-Token'
// clientSocial.defaults.withCredentials = true

export default clientSocial
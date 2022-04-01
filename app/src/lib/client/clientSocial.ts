import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

const options = {
  ignoreHeaders: true 
}

export const clientSocial = applyCaseMiddleware(axios.create({
  baseURL: "http://localhost:3001/",
  // baseURL:"http://192.168.3.5:3001/api/v1",
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
}), options)
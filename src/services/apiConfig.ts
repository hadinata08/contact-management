import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://contact.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

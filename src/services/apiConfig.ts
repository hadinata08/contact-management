import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://contact.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

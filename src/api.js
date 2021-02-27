import axios from "axios";

const BASE_URL = `https://6.react.pages.academy/wtw`;
const TIMEOUT = 5000;

export const createApi = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true
  });

  return api;
};



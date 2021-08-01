import axios from "axios";

const url = "http://localhost:4000/api/v1";

export const API = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});

export const setAuthToken = async (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

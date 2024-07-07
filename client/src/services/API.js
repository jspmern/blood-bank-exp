import axios from "axios";
let API = axios.create({
  baseURL: "http://localhost:8000",
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem("blood_token")) {
    req.headers.Authorization = localStorage.getItem("blood_token");
  }
  return req;
});
export default API;

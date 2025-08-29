import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5129/api",
});

export default api;

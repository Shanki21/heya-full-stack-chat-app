import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE=== "development" ? "http://localhost:5001/api": "/api", // "http://localhost:5001/api" is dynamic depending on evironment either in development or in production
    withCredentials: true                       //for sending cookies for every single request
});
import axios from "axios"
export const VITE_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://sherr-krishna-mobile.onrender.com' : 'http://localhost:8000'
export const instance = axios.create({
    baseURL: VITE_BASE_URL+"/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})
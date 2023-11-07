import axios from "axios";

const BASE_URL = 'http://127.0.0.1:3000/' ; 
// const BASE_URL2 = 'http://localhost:5000/' ;

const API_REQUEST = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
}) ;

export const axiosPrivate = axios.create({
    baseURL: BASE_URL, 
    headers:{ "Content-Type" : 'application/json' },
    withCredentials: true
}) ;

export default API_REQUEST ;
import axios from "axios";

const BASE_URL = 'http://localhost:4000/' ; 

const API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
}) ;

export const axiosPrivate = axios.create({
    baseURL: BASE_URL, 
    // headers:{ "Content-Type" : 'application/json' },
    withCredentials: true
}) ;

export default API ;
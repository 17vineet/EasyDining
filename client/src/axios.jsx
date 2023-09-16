import axios from "axios";

const API=axios.create({
    baseURL:"http://localhost:4000/"
}) ;

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile'))}`;
    }
    return req;
});

export default API;
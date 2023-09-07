import axios from "axios";

const API=axios.create({
    baseURL:"https://easy-dining-4c644-default-rtdb.firebaseio.com/"
})
export default API;
import axios from "axios";

export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))?.access,
    },
    // withCredentials: true,
})

export default axiosInstance;
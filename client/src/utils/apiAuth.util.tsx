import axios from "axios"

const axiosAuthInstance = axios.create({
    baseURL: "http://localhost:5000/auth",
    headers: {
        "Content-Type": "application/json"
    }
})

export default axiosAuthInstance
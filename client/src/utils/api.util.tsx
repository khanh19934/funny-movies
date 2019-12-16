import axios from "axios"

import {getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken} from "../services/localStorage.service"

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        common: {
            'Accept': 'application/json, text/plain, */*'
        },
    }
})

axiosInstance.interceptors.request.use(
    (config: any): any => {
        const token: string = getAccessToken();
        if (token) {
            config.headers['authorization'] = token
        }
        return config
    }
)

axiosInstance.interceptors.response.use(res => res, error => {
    const originalRequest = error.config;
    if (error.response.data.statusCode === 401 && originalRequest.url === 'http://localhost:5000/api/auth/token') {
        return Promise.reject(error);
    }

    if (error.response.data.statusCode === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = getRefreshToken()
        return axiosInstance.post('/auth/token', {
            refreshToken,
            token: getAccessToken()
        }).then(res => {
            if (res.status === 200) {
                saveRefreshToken(res.data.refreshToken)
                saveAccessToken(res.data.token)
                axiosInstance.defaults.headers['authorization'] = res.data.token
                return axiosInstance(originalRequest)
            }
            return Promise.reject(error);
        })
    }
    return Promise.reject(error);
})

export default axiosInstance
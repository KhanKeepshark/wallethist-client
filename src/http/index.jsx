import axios from "axios"

export const $host = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_SERVER_URL
})

export const $authHost = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_SERVER_URL
})

$authHost.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$authHost.interceptors.response.use(config => {
    return config
}, async (error) => {
    try {
        const originalReq = error.config
        if(error.response.status == 401) {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}user/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            return $authHost.request(originalReq)
        }
    } catch(e) {
        console.log(e)
    }
})
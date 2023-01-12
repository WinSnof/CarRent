import axios from "axios";

const BASE_URL = 'http://localhost:8090/';

const $host = axios.create({
    baseURL: BASE_URL
});

const $authHost = axios.create({
    baseURL: BASE_URL
});

const authInterceptor = (config) => {
    config.headers.Authorization = "Bearer " + localStorage.getItem('token');
    return config;
}

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}
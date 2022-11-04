import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
    baseURL: "http://localhost:8000/"
}

const httpClient = axios.create(config);

export default httpClient;
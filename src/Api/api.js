import axios from "axios";
import Config from "../Config"


const api_url = Config.API_URL;


const apiClient = axios.create({
    baseURL: api_url
})
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }
        return config;

    },
    (error) => {
        return Promise.reject(error);
    })

export const register = async (props) => {

    const response = await axios.post(`${api_url}/users/register`, props)

    return response
}

export const login = async (props) => {
   
    const response = await axios.post(`${api_url}/users/login`, props);

    return response;
}

export const getUserData = async()=>{
    const response = await apiClient.get('/users/me');
    
    return response.data;
}
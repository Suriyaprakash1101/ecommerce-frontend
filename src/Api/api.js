import axios from "axios";
import Config from "../Config"
import { useApp } from "../components/AppContext";


const api_url = Config.API_URL;


const apiClient = axios.create({
    baseURL: api_url
})
const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            if (isTokenExpired(token)) {
            // Token expired, handle logout
            const context = useApp();
            context.logout();
            return Promise.reject(new Error('Token expired'));
        }
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


export const updateUser = async(data,user_id)=>{
   
    const response = await apiClient.put(`/users/update/${user_id}`,data)
    console.log(response)
    return response;
}
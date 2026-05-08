import axios from "axios";
import Config from "../Config"
import { useApp } from "../components/AppContext";


const api_url = Config.API_URL;
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};


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
// Function to refresh the access token
const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        console.log('🔄 Refreshing access token...');
        const response = await axios.post(`${api_url}/users/refresh`, {
            refresh_token: refreshToken
        });

        if (response.data?.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
            
            // If using refresh token rotation
            if (response.data.refresh_token) {
                localStorage.setItem('refresh_token', response.data.refresh_token);
            }
            
            console.log('✅ Access token refreshed successfully');
            return response.data.access_token;
        }
        throw new Error('No access token in refresh response');
        
    } catch (error) {
        console.error('❌ Token refresh failed:', error);
        // Clear all tokens and redirect to login
        localStorage.clear();
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
        throw error;
    }
};
apiClient.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem('access_token');
        
        if (token) {
            if (isTokenExpired(token)) {
                console.log('⚠️ Token expired, attempting to refresh...');
                
                if (!isRefreshing) {
                    isRefreshing = true;
                    try {
                        token = await refreshAccessToken();
                        config.headers.Authorization = "Bearer " + token;
                        processQueue(null, token);
                    } catch (error) {
                        processQueue(error, null);
                        return Promise.reject(error);
                    } finally {
                        isRefreshing = false;
                    }
                } else {
                    // Queue requests while refreshing
                    return new Promise((resolve, reject) => {
                        failedQueue.push({
                            resolve: (token) => {
                                config.headers.Authorization = "Bearer " + token;
                                resolve(apiClient(config));
                            },
                            reject: (err) => reject(err)
                        });
                    });
                }
            } else {
                config.headers.Authorization = "Bearer " + token;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling 401 errors
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const newToken = await refreshAccessToken();
                originalRequest.headers.Authorization = "Bearer " + newToken;
                return apiClient(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);



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
export const manualRefreshToken = async () => {
    return await refreshAccessToken();
};
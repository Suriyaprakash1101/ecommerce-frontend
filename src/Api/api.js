import axios from "axios";
import Config from "../Config"


const api_url = Config.API_URL;



export const register = async(props)=>{
   
    const response = await axios.post(`${api_url}/users/register`,props)
    console.log(response)
    return response
}

export const login = async(props)=>{
    console.log("login function call")
    const response = await axios.post(`${api_url}/users/login`,props);
    console.log(response)
    return response;
}
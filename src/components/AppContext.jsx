import React, { Children, createContext, useContext, useEffect, useState } from "react";
import img1 from '../assets/perfume5.jpg'
import img2 from '../assets/perfume4.jpg'
import img3 from '../assets/perfume3.jpg'
import img4 from '../assets/airpods1.jpg'
import img5 from '../assets/cloth1.jpg'
import img6 from '../assets/watch1.jpg'
import img7 from '../assets/watch2.jpg'
import img8 from '../assets/cloth2.jpg'
import { getUserData } from "../Api/api";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();
const AppProvider = ({ children }) => {
   const navigate = useNavigate();
    const colorPalette = {

        background: {
            primary: "#FFFFFF",   // Clean white - main page background
            secondary: "#F2F5FA"  // Icy blue-white - cards, modals, sidebars
        },


        brand: {
            primary: "#6BD3E0",   // Iridescent Aqua - header, CTAs, primary buttons
            secondary: "#3A6B7C"  // Soft Teal - footer, secondary buttons
        },

        accent: "#ADB7CC",      // Pearlescent Purple - borders, dividers, inactive elements


        text: {
            primary: "#1A2A36",   // Midnight Blue-tinted black - main text
            secondary: "#5B6F82",  // Muted slate - subtext, labels, meta info
            header:"#49A8B4"
        },


        cta: "#6BD3E0",         // Aqua - all call-to-action buttons
        saleBadge: "#D4AF37",   // Soft Gold - sale tags, discount badges
        ratingStar: "#D4AF37",  // Gold - rating stars


        status: {
            success: "#81C784",    // Soft green - success messages, in stock
            error: "#E57373",      // Soft red - errors, out of stock
            warning: "#FFB74D",    // Orange - low stock warnings
            disabled: "#E0E0E0"    // Light grey - disabled buttons
        },


        overlay: "rgba(0, 0, 0, 0.5)"
    };
    const [isLoggedIn,setIsLoggedIn] = useState(false)
  
     
    useEffect(()=>{
       getUserDetails();
    },[])
    const getUserDetails = ()=>{
        if(localStorage.getItem("access_token")){
            setIsLoggedIn(true)
            getUserData().then((data)=>{
                setUserData(data);
            })
        }
    }
     const logout = ()=>{
        localStorage.removeItem("access_token");
        localStorage.removeItem('token_type');
        localStorage.removeItem('user_email');
        setUserData({})
        setIsLoggedIn(false)
        
       navigate('/');

    }
   
    const[userData,setUserData]=useState({});
    
    const value = {
        colorPalette,
        isLoggedIn,
        setIsLoggedIn,
        logout,
        userData,
        setUserData,
        getUserDetails
    }
    
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = ()=>{
    const context = useContext(AppContext)
    return context
}
export default AppProvider;
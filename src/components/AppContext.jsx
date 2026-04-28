import React, { Children, createContext, useContext, useState } from "react";

export const AppContext = createContext();
const AppProvider = ({ children }) => {

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

    const value = {
        colorPalette,
        isLoggedIn,
        setIsLoggedIn
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
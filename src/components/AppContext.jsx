import React, { Children, createContext, useContext, useState } from "react";
import img1 from '../assets/perfume5.jpg'
import img2 from '../assets/perfume4.jpg'
import img3 from '../assets/perfume3.jpg'
import img4 from '../assets/airpods1.jpg'
import img5 from '../assets/cloth1.jpg'
import img6 from '../assets/watch1.jpg'
import img7 from '../assets/watch2.jpg'
import img8 from '../assets/cloth2.jpg'
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
    const product = [
            {
                id: 1,
                image: img1,
                prdname: "Rose Perfume",
                category: "perfume",
                prdDescription: "Luxury floral fragrance",
                price: 400,
                quantity: 50,
                rating: 4
            },
            {
                id: 2,
                image: img2,
                prdname: "Vanilla Perfume",
                category: "perfume",
                prdDescription: "Sweet vanilla essence",
                price: 450,
                quantity: 35,
                rating: 5
            },
            {
                id: 3,
                image: img3,
                prdname: "Ocean Perfume",
                category: "perfume",
                prdDescription: "Fresh aquatic fragrance",
                price: 500,
                quantity: 25,
                rating: 4
            },
            {
                id: 4,
                image: img4,
                prdname: "AirPods Pro",
                category: "electronics",
                prdDescription: "Wireless Bluetooth Earbuds",
                price: 2499,
                quantity: 15,
                rating: 5
            },
            {
                id: 5,
                image: img5,
                prdname: "Casual Shirt",
                category: "clothing",
                prdDescription: "Cotton slim-fit shirt",
                price: 899,
                quantity: 40,
                rating: 4
            },
            {
                id: 6,
                image: img6,
                prdname: "Classic Watch",
                category: "watch",
                prdDescription: "Elegant analog watch",
                price: 1999,
                quantity: 20,
                rating: 5
            },
            {
                id: 7,
                image: img7,
                prdname: "Sport Watch",
                category: "watch",
                prdDescription: "Water-resistant sports watch",
                price: 1799,
                quantity: 18,
                rating: 4
            },
            {
                id: 8,
                image: img8,
                prdname: "Casual Shirt",
                category: "clothing",
                prdDescription: "Cotton slim-fit shirt",
                price: 899,
                quantity: 40,
                rating: 4
            },
        ];
    const value = {
        colorPalette,
        isLoggedIn,
        setIsLoggedIn,
        product
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
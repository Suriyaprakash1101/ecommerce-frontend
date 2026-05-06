import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import img from '../assets/seaImg.jpg'
import { useApp } from "./AppContext";

import { RiArrowRightLine } from '@remixicon/react'
import Product from "./Product";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const context = useApp();
    const colorPalette = context.colorPalette
    const navigate = useNavigate();

    return (
        <div className="" >
            <Header />
            <div style={{ background: colorPalette.background.secondary }}>
                <div className="mt-5 p-4 h-[350px]" >
                    <div className="relative">
                        <img
                            className="
        rounded-md 
        absolute 
        w-full 
        h-[300px]      
        
        object-cover 
        object-center
       

    "
                            src={img}
                            alt="sea image"
                        />
                        <div className="absolute flex flex-col gap-3.5 p-2  ml-6 mt-3">
                            <div className="font-bold text-2xl" style={{ color: colorPalette.text.header }}>
                                <h1>Luminous Living for the</h1>
                                <h1>Modern Siren</h1>
                            </div>
                            <div className="font-light">
                                <p>Discover a curated collection of ocean-inspired essential <span>designed to bring the ethereal beauty of the sea into your everyday life.</span></p>
                            </div>
                            <div className="">
                                <button className="p-2 text-white rounded-4xl flex flex-row gap-1.5 mt-4" style={{ background: colorPalette.text.header }} onClick={()=> navigate("/product")}>
                                    <p>Shop the Product</p>
                                    <div> < RiArrowRightLine /></div>

                                </button>
                            </div>
                        </div>

                    </div>

                </div>
                <Product />
                <Footer />
            </div>




        </div>
    )
}

export default Home
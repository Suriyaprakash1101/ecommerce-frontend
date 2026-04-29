import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {RiGitRepositoryPrivateLine, RiMailLine,RiMapPinUserLine} from '@remixicon/react'
import { useApp } from "./AppContext";

const Login = ()=>{
    const context = useApp();
    const color = context.colorPalette;
    const[loginData,setLoginData]=useState({
        email:"",
        password:""
    })

    const handleChange = (e,key)=>{
        setLoginData({...loginData,[key]:e.target.value});
    }
    const validateInput=()=>{
        if(loginData.email.trim().length===0 || loginData.password.trim().length === 0){
            return false;
        }
        return true;
    }
    const handleSubmit = ()=>{
        if(!validateInput()){
            alert("Please enter valid data");
            return
        }
        alert("Login successful")
    }


    return <div className="h-screen flex justify-center items-center" style={{background:color.background.secondary}}>
        <div className="bg-white p-8 flex flex-col rounded-2xl lg:md">
        <div className="bg-white p-8 flex flex-col justify-center items-center">
            <div className="w-13 p-3.5 mr-2" style={{background:color.cta,borderRadius:100}}>
                <div className="text-white">< RiMapPinUserLine  /></div>
            </div>
            <p className="p-3 font-semibold">Welcome Back</p>
            <p className="text-gray-400 p-2">Enter your details to drive back in</p>
        </div>
            <form action="" onSubmit={handleSubmit}>

                <div className="p-2 flex flex-col gap-3">
                    <p>Email</p>
                    <div className="flex border-2 border-gray-400 p-2 rounded-xl gap-3">
                        <label htmlFor="email">
< RiMailLine  /></label>
                        <input className="outline-0" type="email" id="email" placeholder="mermaid@ocean.com" onChange={(e)=>handleChange(e,"email")}/>

                    </div>
                    
                </div>

                <div className="p-2 flex flex-col gap-3">
                    <p>Password</p>
                    <div  className="flex border-2 border-gray-400 p-2 rounded-xl gap-3">
                        <label htmlFor="password">< RiGitRepositoryPrivateLine  /></label>
                         <input className="outline-0 flex-1" type="password" id="password" placeholder="XXXX" onChange={(e)=>handleChange(e,"password")}/>
                    </div>
                   
                </div>
                <button className="w-full p-2 mb-2 mt-2 rounded-2xl font-semibold hover:cursor-pointer" style={{background:color.cta,color:color.text.primary}} type="submit">Login</button>

                <p className="text-center p-3">New User? <NavLink to = '/signup' ><span className="font-semibold" style={{color:color.cta}}>Sign Up</span></NavLink> </p>
            </form>
        </div>
    </div>
}

export default Login;
import React, { useState } from 'react'
import { useApp } from './AppContext';
import { NavLink } from 'react-router-dom';

const SignUp = () => {
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        address: ""
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMAtch] = useState(false);

    const context = useApp();
    const color = context.colorPalette;
    const handleChange = (e,key)=>{
        setProfileData({...profileData,[key]:e.target.value});
        
    }
    const validateInput = ()=>{
        if(profileData.password != confirmPassword || profileData.password.trim().length<8){
            return false;
        }
        if(profileData.name.trim().length == 0 || profileData.password.trim().length == 0 || profileData.email.trim().length == 0 || profileData.mobile == 0){
            return false;
        }
        return true;
    }
    const handleSubmit=()=>{
       if(!validateInput()){
         alert("Please enter the valid Data")
         return
       }
       alert("User registered successfully...")



    }

    return <div className='flex flex-col justify-center items-center h-screen' style={{ background: color.background.secondary }}>
        <div className='bg-white p-4 w-full lg:w-md sm:w-3/4 md:w-md rounded-2xl'>


            <h2 className='text-center font-bold' style={{ color: color.text.header }}>AQUA</h2>
            <h2 className='text-center font-extrabold text-2xl'>CREATE ACCOUNT</h2>
            <p className='text-center text-gray-400 mb-7'>Drive into the mermaidcore Collection</p>
            <form action="" onSubmit={handleSubmit}>
                <div className='flex flex-col gap-2 p-2'>
                    <div>
                        <p className='font-semibold'>Full Name</p>
                        <input type="text" placeholder=' Ariel waters' className='border-2 border-gray-400 w-3/4 p-1 rounded-md'  onChange={(e)=>{handleChange(e,'name')}}/>
                    </div>

                    <div>
                        <p className='font-semibold'>Email</p>
                        <input type="email" placeholder=' ariel@oceania.com' className='border-2 border-gray-400 w-3/4 p-1 rounded-md' onChange={(e)=>{handleChange(e,'email')}}/>
                    </div>

                    <div className='flex flex-col lg:flex-row md:flex-row sm:flex-col gap-4 justify-between'>
                        <div>
                            <p className='font-semibold'>Password</p>
                            <input type="password" className='border-2 border-gray-400  p-1 rounded-md' onChange={(e)=>{handleChange(e,'password')}}/>
                            <div className='flex flex-row gap-2.5'>
                                <p>8+chars required</p>
                                <p>{profileData.password.length} characters</p>
                            </div>
                        </div>
                        <div className='mr-7'>
                            <p className='font-semibold'>Confirm Password</p>
                            <input type="password" className='border-2 border-gray-400  p-1 rounded-md' onChange={(e)=>setConfirmPassword(e.target.value)}/>
                            {(passwordMatch && profileData.password.length > 0) ? <p>Password match</p> : (profileData.password.length>0)?<p>Password does not match</p>:<p></p>}
                        </div>
                    </div>
                    <div>
                        <p className='font-semibold'>Mobile Number</p>
                        <div>
                            <input type="number" placeholder='1234567890' className='border-2 border-gray-400 w-3/4 p-1 rounded-md' onChange={(e)=>{handleChange(e,'mobile')}}/>
                        </div>
                    </div>
                    <div>
                        <p className='font-semibold'>Address</p>
                        <input type="text" placeholder='Coastal Cave 42, Blue Langoon Reef' className='border-2 border-gray-400 w-3/4 p-1 rounded-md'  onChange={(e)=>{handleChange(e,'address')}}/>
                    </div>
                    <button type='submit' className='m-3 p-2 font-semibold rounded-md hover:cursor-pointer' style={{ background: color.cta, color: color.text.primary }}>SIGN UP</button>
                    <p className='text-center'>Already have an account? <NavLink className='font-semibold' to='/login'  style={{ color: color.text.header }}>Login</NavLink></p>
                </div>
            </form>
        </div>
    </div>

}

export default SignUp
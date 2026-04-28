import React, { useState } from 'react'
import { useApp } from './AppContext';

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

    return <div className='flex flex-col justify-center items-center h-screen' style={{ background: color.background.secondary }}>
        <div className='bg-white p-4 w-1/2 lg:w-md sm:w-3/4 md:w-3/4 rounded-2xl'>


            <h2 className='text-center font-bold' style={{ color: color.text.header }}>AQUA</h2>
            <h2 className='text-center font-extrabold text-2xl'>CREATE ACCOUNT</h2>
            <p className='text-center text-gray-400 mb-7'>Drive into the mermaidcore Collection</p>
            <div className='flex flex-col gap-2 p-2'>
                <div>
                    <p className='font-semibold'>Full Name</p>
                    <input type="text" placeholder=' Ariel waters' className='border-2 border-gray-400 w-3/4 p-1 rounded-md' />
                </div>

                <div>
                    <p className='font-semibold'>Email</p>
                    <input type="email" placeholder=' ariel@oceania.com'  className='border-2 border-gray-400 w-3/4 p-1 rounded-md'/>
                </div>

                <div>
                    <div>
                        <p className='font-semibold'>Password</p>
                        <input type="password" className='border-2 border-gray-400 w-3/4 p-1 rounded-md'/>
                        <div>
                            <p>8+chars required</p>
                            <p>{profileData.password.length} characters</p>
                        </div>
                    </div>
                    <div>
                        <p className='font-semibold'>Confirm Password</p>
                        <input type="password" className='border-2 border-gray-400 w-3/4 p-1 rounded-md'/>
                        {(passwordMatch && profileData.password.length > 0) ? <p>Password match</p> : <p>Password does not match</p>}
                    </div>
                </div>
                <div>
                    <p className='font-semibold'>Mobile Number</p>
                    <div>
                        <input type="number" placeholder='1234567890' className='border-2 border-gray-400 w-3/4 p-1 rounded-md'/>
                    </div>
                </div>
                <div>
                    <p className='font-semibold'>Address</p>
                    <input type="text" placeholder='Coastal Cave 42, Blue Langoon Reef' className='border-2 border-gray-400 w-3/4 p-1 rounded-md'/>
                </div>
                <button>SIGN UP</button>
                <p>Already have an account? <span>Login</span></p>
            </div>
        </div>
    </div>

}

export default SignUp
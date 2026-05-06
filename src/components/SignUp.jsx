import React, { useEffect, useState } from 'react'
import { useApp } from './AppContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { register } from '../Api/api';

const SignUp = () => {
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        address: ""
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const context = useApp();
    const navigate = useNavigate();
    const color = context.colorPalette;

    useEffect(() => {
        setPasswordMatch(confirmPassword === profileData.password);
    }, [confirmPassword, profileData.password]);

    const handleChange = (e, key) => {
        setProfileData({ ...profileData, [key]: e.target.value });
    }

    const validateInput = () => {
        if (profileData.password !== confirmPassword || profileData.password.trim().length < 8) {
            alert("Password must be at least 8 characters and match the confirmation");
            return false;
        }
        
        if (profileData.name.trim().length === 0 || 
            profileData.password.trim().length === 0 || 
            profileData.email.trim().length === 0 || 
            profileData.mobile.trim().length === 0) {
            alert("Please fill in all required fields");
            return false;
        }
       
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(profileData.email)) {
            alert("Please enter a valid email address");
            return false;
        }
        
        if (!/^\d{10}$/.test(profileData.mobile)) {
            alert("Please enter a valid 10-digit mobile number");
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateInput()) {
            return;
        }
        
        setIsLoading(true);
        
        try {
            const response = await register(profileData);
            console.log("Registration successful:", response);
            
            
            setShowSuccessPopup(true);
            
           
            setTimeout(() => {
                setShowSuccessPopup(false);
                navigate('/login');
            }, 3000);
            
        } catch (error) {
            console.error("Registration failed:", error);
            alert(error.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    
    const SuccessPopup = () => {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 animate-fadeIn">
                <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl transform animate-slideUp">
                    <div className="flex flex-col items-center text-center">
                       
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-bounceIn">
                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h3>
                        <p className="text-gray-600 mb-2">
                            Welcome to AQUA, {profileData.name.split(' ')[0]}!
                        </p>
                        <p className="text-gray-500 text-sm mb-4">
                            Redirecting you to login page...
                        </p>
                       
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 overflow-hidden">
                            <div 
                                className="h-1.5 rounded-full transition-all duration-3000 ease-linear"
                                style={{ 
                                    width: '100%',
                                    background: color.cta
                                }}
                            ></div>
                        </div>
                        
                       
                        <button
                            onClick={() => {
                                setShowSuccessPopup(false);
                                navigate('/login');
                            }}
                            className="mt-2 px-4 py-2 text-sm rounded-md hover:opacity-90 transition-opacity"
                            style={{ 
                                background: color.cta,
                                color: color.text.primary
                            }}
                        >
                            Go to Login Now
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen' style={{ background: color.background.secondary }}>
            <div className='bg-white p-4 w-full lg:w-md sm:w-3/4 md:w-md rounded-2xl'>
                <h2 className='text-center font-bold' style={{ color: color.text.header }}>AQUA</h2>
                <h2 className='text-center font-extrabold text-2xl'>CREATE ACCOUNT</h2>
                <p className='text-center text-gray-400 mb-7'>Dive into the mermaidcore Collection</p>
                
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2 p-2'>
                        <div>
                            <p className='font-semibold'>Full Name</p>
                            <input 
                                type="text" 
                                placeholder='Ariel waters' 
                                className='border-2 border-gray-400 w-3/4 p-1 rounded-md'  
                                onChange={(e) => handleChange(e, 'name')}
                                required
                            />
                        </div>

                        <div>
                            <p className='font-semibold'>Email</p>
                            <input 
                                type="email" 
                                placeholder='ariel@oceania.com' 
                                className='border-2 border-gray-400 w-3/4 p-1 rounded-md' 
                                onChange={(e) => handleChange(e, 'email')}
                                required
                            />
                        </div>

                        <div className='flex flex-col lg:flex-row md:flex-row sm:flex-col gap-4 justify-between'>
                            <div>
                                <p className='font-semibold'>Password</p>
                                <input 
                                    type="password" 
                                    className='border-2 border-gray-400 p-1 rounded-md' 
                                    onChange={(e) => handleChange(e, 'password')}
                                    required
                                />
                                <div className='flex flex-row gap-2.5 text-sm'>
                                    <p>8+ chars required</p>
                                    <p>{profileData.password.length} characters</p>
                                </div>
                            </div>
                            <div className='mr-7'>
                                <p className='font-semibold'>Confirm Password</p>
                                <input 
                                    type="password" 
                                    className='border-2 border-gray-400 p-1 rounded-md' 
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                {profileData.password.length > 0 && (
                                    passwordMatch ? 
                                    <p className='text-green-600 text-sm'>✓ Password matches</p> : 
                                    <p className='text-red-600 text-sm'>✗ Password does not match</p>
                                )}
                            </div>
                        </div>
                        
                        <div>
                            <p className='font-semibold'>Mobile Number</p>
                            <div>
                                <input 
                                    type="tel"
                                    placeholder='1234567890' 
                                    className='border-2 border-gray-400 w-3/4 p-1 rounded-md' 
                                    onChange={(e) => handleChange(e, 'mobile')}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div>
                            <p className='font-semibold'>Address</p>
                            <input 
                                type="text" 
                                placeholder='Coastal Cave 42, Blue Lagoon Reef' 
                                className='border-2 border-gray-400 w-3/4 p-1 rounded-md'  
                                onChange={(e) => handleChange(e, 'address')}
                            />
                        </div>
                        
                        <button 
                            type='submit' 
                            className='m-3 p-2 font-semibold rounded-md hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' 
                            style={{ background: color.cta, color: color.text.primary }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
                        </button>
                        
                        <p className='text-center'>
                            Already have an account? 
                            <NavLink className='font-semibold ml-1' to='/login' style={{ color: color.text.header }}>
                                Login
                            </NavLink>
                        </p>
                    </div>
                </form>
            </div>
            
            {/* Success Popup */}
            {showSuccessPopup && <SuccessPopup />}
        </div>
    )
}

export default SignUp
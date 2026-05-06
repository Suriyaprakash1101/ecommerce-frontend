

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RiGitRepositoryPrivateLine, RiMailLine, RiMapPinUserLine } from '@remixicon/react';
import { useApp } from "./AppContext";
import { login } from "../Api/api";

const Login = () => {
    const context = useApp();
    const navigate = useNavigate();

    const { colorPalette: color, setIsLoggedIn } = context;

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleChange = (e, key) => {
        setLoginData(prev => ({ ...prev, [key]: e.target.value }));
    };

    const validateInput = () => {
        const { email, password } = loginData;
        return email.trim().length > 0 && password.trim().length > 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!validateInput()) {
            alert("Please enter valid data");
            return;
        }

        setIsLoading(true);

        try {
            const response = await login(loginData);
            
            if (response.status === 200 && response.data?.access_token) {
                
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('token_type', response.data.token_type);
                localStorage.setItem('user_email', loginData.email);

                // Show success popup instead of direct navigation
                setShowSuccessPopup(true);
                
                // Redirect after 2.5 seconds
                setTimeout(() => {
                    setShowSuccessPopup(false);
                    setIsLoggedIn(true);
                    navigate('/');
                }, 2500);

            } else {
                alert("Login failed. Please check your credentials.");
            }

        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Success Popup Component
    const SuccessPopup = () => {
        // Get user email for personalized message
        const userEmail = loginData.email;
        const userName = userEmail.split('@')[0];

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 animate-fadeIn">
                <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl transform animate-slideUp">
                    <div className="flex flex-col items-center text-center">
                        {/* Success Icon */}
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-bounceIn">
                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        
                        {/* Welcome Message */}
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h3>
                        <p className="text-gray-600 mb-2">
                            Successfully logged in as <span className="font-semibold" style={{ color: color.cta }}>{userName}</span>
                        </p>
                        <p className="text-gray-500 text-sm mb-4">
                            Redirecting you to dashboard...
                        </p>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 overflow-hidden">
                            <div 
                                className="h-1.5 rounded-full transition-all duration-2500 ease-linear"
                                style={{ 
                                    width: '100%',
                                    background: color.cta
                                }}
                            ></div>
                        </div>
                        
                        {/* Manual Redirect Button */}
                        <button
                            onClick={() => {
                                setShowSuccessPopup(false);
                                setIsLoggedIn(true);
                                navigate('/');
                            }}
                            className="mt-2 px-4 py-2 text-sm rounded-md hover:opacity-90 transition-opacity font-semibold"
                            style={{ 
                                background: color.cta,
                                color: color.text.primary
                            }}
                        >
                            Go to Dashboard Now
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div
                className="h-screen flex justify-center items-center"
                style={{ background: color.background.secondary }}
            >
                <div className="bg-white p-8 flex flex-col rounded-2xl lg:md">
                    <div className="bg-white p-8 flex flex-col justify-center items-center">
                        <div
                            className="w-13 p-3.5 mr-2"
                            style={{ background: color.cta, borderRadius: 100 }}
                        >
                            <div className="text-white">
                                <RiMapPinUserLine />
                            </div>
                        </div>
                        <p className="p-3 font-semibold">Welcome Back</p>
                        <p className="text-gray-400 p-2">Enter your details to drive back in</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="p-2 flex flex-col gap-3">
                            <p>Email</p>
                            <div className="flex border-2 border-gray-400 p-2 rounded-xl gap-3">
                                <label htmlFor="email">
                                    <RiMailLine />
                                </label>
                                <input
                                    className="outline-0"
                                    type="email"
                                    id="email"
                                    placeholder="mermaid@ocean.com"
                                    onChange={(e) => handleChange(e, "email")}
                                    value={loginData.email}
                                />
                            </div>
                        </div>

                        <div className="p-2 flex flex-col gap-3">
                            <p>Password</p>
                            <div className="flex border-2 border-gray-400 p-2 rounded-xl gap-3">
                                <label htmlFor="password">
                                    <RiGitRepositoryPrivateLine />
                                </label>
                                <input
                                    className="outline-0 flex-1"
                                    type="password"
                                    id="password"
                                    placeholder="XXXX"
                                    onChange={(e) => handleChange(e, "password")}
                                    value={loginData.password}
                                />
                            </div>
                        </div>

                        <button
                            className="w-full p-2 mb-2 mt-2 rounded-2xl font-semibold hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                            style={{ background: color.cta, color: color.text.primary }}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'LOGGING IN...' : 'Login'}
                        </button>

                        <p className="text-center p-3">
                            New User?
                            <NavLink to='/signup'>
                                <span className="font-semibold ml-1" style={{ color: color.cta }}>Sign Up</span>
                            </NavLink>
                        </p>
                    </form>
                </div>
            </div>

            {/* Success Popup */}
            {showSuccessPopup && <SuccessPopup />}
        </>
    );
};

export default Login;
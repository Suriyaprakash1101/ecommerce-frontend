

import React, { useState } from "react";
import { updateUser } from "../Api/api";
import { useApp } from "./AppContext";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const EditUser = () => {
    const context = useApp();
    const navigate = useNavigate();
    const userData = context.userData;
    const [updateData, setUpdateData] = useState({
        email: "",
        name: "",
        address: "",
        mobile: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const color = context.colorPalette;
    const handleChange = (key, value) => {
        setUpdateData((prev) => {
            return { ...prev, [key]: value };
        });
        // Clear message when user starts typing
        if (message.text) setMessage({ type: '', text: '' });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!updateData.name && !updateData.email && !updateData.mobile && !updateData.address) {
            setMessage({ type: 'error', text: 'Please fill at least one field to update' });
            return;
        }

        setIsLoading(true);
        try {
            const response = await updateUser(updateData, userData.id);
            setMessage({ type: 'success', text: 'User information updated successfully!' });
            // Clear form after successful update
            setUpdateData({
                email: "",
                name: "",
                address: "",
                mobile: ""
            });
            // Optional: Refresh user data in context
            if (context.refreshUserData) {
                context.getUsetDetails();
            }

            navigate('/')
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update user information. Please try again.' });
            console.error("Update error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">

                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2" style={{ border: color.cta }}>
                    Edit User Information
                </h3>

                {message.text && (
                    <div className={`mb-4 p-3 rounded-md ${message.type === 'success'
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-red-100 text-red-700 border border-red-200'
                        }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={updateData.name}
                            placeholder="Enter your full name"
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={updateData.email}
                            placeholder="Enter your email address"
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                            Mobile Number
                        </label>
                        <input
                            type="tel"
                            id="mobile"
                            value={updateData.mobile}
                            placeholder="Enter your mobile number"
                            onChange={(e) => handleChange("mobile", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            value={updateData.address}
                            placeholder="Enter your address"
                            onChange={(e) => handleChange("address", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                        style={{ background: color.cta }}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Updating...
                            </span>
                        ) : (
                            'Update Information'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
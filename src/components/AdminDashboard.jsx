


import React from "react";
import Header from "./Header";
import { RiPencilLine } from '@remixicon/react';
import AddProduct from "./AddProduct";
import ViewProduct from "./ViewProduct";
import { useApp } from "./AppContext";

const AdminDashboard = () => {
    const context = useApp();
    const color = context.colorPalette;

    const admin = {
        name: "Alex",
        role: "Super Admin",
        email: "alex@gmail.com",
        createdAt: "12.03.2024"
    };

    return (
        <div>
            <Header />
            <div 
                className="flex flex-row gap-10 p-6 min-h-screen"
                style={{ background: color.background.primary }}
            >
              
                <div className="w-64 bg-white rounded-lg shadow-md p-4 h-fit">
                    <div className="space-y-4">
                        <div className="pb-4 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-700">Admin Panel</h3>
                        </div>
                        <nav className="space-y-2">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-md cursor-pointer">
                                Dashboard
                            </div>
                            <div className="p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                                Products
                            </div>
                            <div className="p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                                Orders
                            </div>
                            <div className="p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                                Users
                            </div>
                            <div className="p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                                Settings
                            </div>
                        </nav>
                    </div>
                </div>

              
                <div className="flex-1 space-y-6">
                   
                    <div className="bg-white rounded-lg shadow-md p-6">
                       
                        <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-200">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Admin Profile</h2>
                                <p className="text-gray-500 mt-1">Manage your account and preferences</p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2  text-white rounded-md transition-colors" style={{background:color.cta,color:color.text.primary}}>
                                <RiPencilLine className="w-4 h-4" />
                                <span>Edit Profile</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</p>
                                <p className="text-gray-800 font-medium">{admin.name}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</p>
                                <p className="text-gray-800 font-medium">
                                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs">
                                        {admin.role}
                                    </span>
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</p>
                                <p className="text-gray-800 font-medium">{admin.email}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Member Since</p>
                                <p className="text-gray-800 font-medium">{admin.createdAt}</p>
                            </div>
                        </div>
                    </div>

                    
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="mb-4 pb-3 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800">Add New Product</h3>
                            <p className="text-gray-500 text-sm mt-1">Fill in the details to add a new product to your inventory</p>
                        </div>
                        <AddProduct />
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="mb-4 pb-3 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800">Product Inventory</h3>
                            <p className="text-gray-500 text-sm mt-1">Manage and view all your products</p>
                        </div>
                        <ViewProduct />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
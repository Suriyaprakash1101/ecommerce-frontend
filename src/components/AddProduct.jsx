



import React, { useState, useEffect } from "react";
import { useApp } from "./AppContext";
import { getAllCategories, createProduct } from "../Api/productApi";
import { getAuthToken } from "../Api/productApi";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const context = useApp();
    const color = context.colorPalette;
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        productName: "",
        category_id: "",
        price: "",
        description: "",
        quantity: ""
    });
    
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    
    useEffect(() => {
        checkAuth();
        fetchCategories();
    }, []);

    
    const checkAuth = () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setMessage({ type: 'error', text: 'Please login to add products' });
        }
    };

    
    const fetchCategories = async () => {
        try {
            const response = await getAllCategories();
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setMessage({ type: 'error', text: 'Failed to load categories' });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
       
        if (message.text) setMessage({ type: '', text: '' });
    };

  
    const handleReset = () => {
        setFormData({
            productName: "",
            category_id: "",
            price: "",
            description: "",
            quantity: ""
        });
        setMessage({ type: '', text: '' });
    };

   
    const handleSubmit = async () => {
       
        if (!formData.productName.trim()) {
            setMessage({ type: 'error', text: 'Product name is required' });
            return;
        }
        if (!formData.category_id) {
            setMessage({ type: 'error', text: 'Please select a category' });
            return;
        }
        if (!formData.price || parseFloat(formData.price) <= 0) {
            setMessage({ type: 'error', text: 'Please enter a valid price' });
            return;
        }
        if (!formData.quantity || parseInt(formData.quantity) < 0) {
            setMessage({ type: 'error', text: 'Please enter a valid quantity' });
            return;
        }

        
        const token = localStorage.getItem('access_token');
        if (!token) {
            setMessage({ type: 'error', text: 'Please login to add products' });
            return;
        }

        setLoading(true);
        
        try {
           
            const productData = {
                product_name: formData.productName,
                description: formData.description || null,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity),
                category_id: formData.category_id
            };
            
            console.log("Sending product data:", productData);
            
            const response = await createProduct(productData);
            
            if (response.status === 201) {
                setMessage({ type: 'success', text: 'Product added successfully!' });
                handleReset(); 
                
                
                setTimeout(() => {
                    setMessage({ type: '', text: '' });
                }, 3000);
            }
        } catch (error) {
            console.error('Error adding product:', error);
            if (error.response?.status === 401) {
                setMessage({ type: 'error', text: 'Authentication failed. Please login again.' });
               
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else if (error.response?.data?.detail) {
                setMessage({ type: 'error', text: error.response.data.detail });
            } else {
                setMessage({ type: 'error', text: 'Failed to add product. Please try again.' });
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div>
                <Header />
                <div className="p-6 text-center">
                    <p className="text-red-500 mb-4">Please login to add products</p>
                    <a 
                        href="/login" 
                        className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Go to Login
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div 
                className="flex flex-row gap-10 p-6 min-h-screen"
                style={{ background: color.background.primary }}
            >
                {/* Sidebar Panel */}
                <div className="w-64 bg-white rounded-lg shadow-md p-4 h-fit">
                    <div className="space-y-4">
                        <div className="pb-4 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-700">Panel</h3>
                        </div>
                        <nav className="space-y-2">
                            <div className="p-2 hover:bg-gray-50 rounded-md cursor-pointer" onClick={()=>{navigate('/dashboard')}}>
                                Dashboard
                            </div>
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-md cursor-pointer">
                                Add Products
                            </div>
                            <div className="p-2 hover:bg-gray-50 rounded-md cursor-pointer" onClick={()=>{navigate('/viewProduct')}}>
                                View Products
                            </div>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="mb-4 pb-3 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800">Add New Product</h3>
                            <p className="text-gray-500 text-sm mt-1">Fill in the details to add a new product to your inventory</p>
                        </div>
                        

                        {message.text && (
                            <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}
                        
                        <div className="flex flex-row p-4">
                            <div className="flex flex-col gap-3 w-1/2 mr-8">
                                <p className="font-semibold">Product Name <span className="text-red-500">*</span></p>
                                <input 
                                    type="text" 
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    className="border-2 border-gray-400 rounded-sm outline-0 p-2 focus:border-blue-500 transition-colors"
                                    placeholder="Enter product name"
                                />
                            </div>
                            
                            <div className="flex flex-row gap-10">
                                <div className="flex flex-col gap-3">
                                    <p className="font-semibold">Category <span className="text-red-500">*</span></p>
                                    <select 
                                        name="category_id"
                                        value={formData.category_id}
                                        onChange={handleChange}
                                        className="border-2 border-gray-400 rounded-sm outline-0 p-2 focus:border-blue-500 transition-colors min-w-[150px]"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(category => (
                                            <option key={category.category_id} value={category.category_id}>
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="flex flex-col gap-3">
                                    <p className="font-semibold">Price ($) <span className="text-red-500">*</span></p>
                                    <input 
                                        type="number" 
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="border-2 border-gray-400 rounded-sm outline-0 p-2 focus:border-blue-500 transition-colors"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-row justify-between p-4">
                            <div className="flex-1 mr-4">
                                <p className="font-semibold">Description</p>
                                <textarea 
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="border-2 border-gray-400 outline-0 w-full h-24 p-2 rounded-lg focus:border-blue-500 transition-colors"
                                    placeholder="Product description (optional)..."
                                />
                            </div>
                            
                            <div>
                                <p className="font-semibold">Quantity <span className="text-red-500">*</span></p>
                                <input 
                                    type="number" 
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className="border-2 border-gray-400 outline-0 rounded-sm p-2 w-24 focus:border-blue-500 transition-colors"
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                        </div>
                        
                        <div className="flex flex-row-reverse gap-8 p-4">
                            <button 
                                onClick={handleReset}
                                disabled={loading}
                                className="border-2 border-gray-400 rounded-lg pt-1 pb-1 pl-2 pr-2 font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
                            >
                                Reset
                            </button>
                            <button 
                                onClick={handleSubmit}
                                disabled={loading}
                                className="rounded-lg pt-1 pb-1 pl-2 pr-2 font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
                                style={{background: color.cta, color: color.text.primary}}
                            >
                                {loading ? 'Adding...' : 'Add Product'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
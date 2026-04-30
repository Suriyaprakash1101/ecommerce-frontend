


import React, { useState } from "react";
import { useApp } from "./AppContext";

const AddProduct = () => {
    const context = useApp();
    const color = context.colorPalette;
    
  
    const [formData, setFormData] = useState({
        productName: "",
        category: "",
        price: "",
        description: "",
        quantity: ""
    });

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form reset
    const handleReset = () => {
        setFormData({
            productName: "",
            category: "",
            price: "",
            description: "",
            quantity: ""
        });
    };

    
    const handleSubmit = () => {
      
        console.log("Product data:", formData);
       
    };

    return <div className="bg-white p-3 rounded-lg" style={{}}>
        <p className="font-semibold" style={{color: color.cta}}>Add New Product</p>
        
        <div className="flex flex-row p-4">
            <div className="flex flex-col gap-3 w-1/2 mr-8">
                <p className="font-semibold">Product Name</p>
                <input 
                    type="text" 
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="border-2 border-gray-400 rounded-sm outline-0 p-2"
                />
            </div>
            
            <div className="flex flex-row gap-10">
                <div className="flex flex-col gap-3">
                    <p className="font-semibold">Category</p>
                    <select 
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="border-2 border-gray-400 rounded-sm outline-0 p-2"
                    >
                        <option value="">Select a category</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="books">Books</option>
                        <option value="home">Home & Garden</option>
                    </select>
                </div>
                
                <div className="flex flex-col gap-3">
                    <p className="font-semibold">Price</p>
                    <input 
                        type="number" 
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="border-2 border-gray-400 rounded-sm outline-0 p-2"
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
                    className="border-2 border-gray-400 outline-0 w-full h-24 p-2 rounded-lg"
                    placeholder="Product description..."
                />
            </div>
            
            <div>
                <p className="font-semibold">Quantity</p>
                <input 
                    type="number" 
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="border-2 border-gray-400 outline-0 rounded-sm p-2 w-24"
                />
            </div>
        </div>
        
        <div className="flex flex-row-reverse gap-8 p-4">
            <button 
                onClick={handleReset}
                className="border-2 border-gray-400 rounded-lg pt-1 pb-1 pl-2 pr-2 font-semibold hover:bg-gray-100 transition-colors"
            >
                Reset
            </button>
            <button 
                onClick={handleSubmit}
                className="rounded-lg pt-1 pb-1 pl-2 pr-2 font-semibold transition-opacity hover:opacity-90"
                style={{background: color.cta, color: color.text.primary}}
            >
                Add Product
            </button>
        </div>
    </div>
}

export default AddProduct;
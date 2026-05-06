import React, { useState } from "react";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";
import { RiTruckLine } from '@remixicon/react';
import { useApp } from "./AppContext";

const OrderProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;
    console.log(product)
    const { userData, ...data } = useApp();
    const [mobile, setMobile] = useState(userData.mobile || "");
    const [address, setAddress] = useState(userData.address || "");
    const [quantity, setQuantity] = useState(1);

    const colorPalette = {
        background: {
            primary: "#FFFFFF",
            secondary: "#F2F5FA"
        },
        brand: {
            primary: "#6BD3E0",
            secondary: "#3A6B7C"
        },
        accent: "#ADB7CC",
        text: {
            primary: "#1A2A36",
            secondary: "#5B6F82",
            header: "#49A8B4"
        },
        cta: "#6BD3E0",
        saleBadge: "#D4AF37",
        ratingStar: "#D4AF37",
        status: {
            success: "#81C784",
            error: "#E57373",
            warning: "#FFB74D",
            disabled: "#E0E0E0"
        },
        overlay: "rgba(0, 0, 0, 0.5)"
    };

    const handleChangeQuantity = (flag) => {
        if (flag) {
            setQuantity(quantity + 1);
        } else if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handlePlaceOrder = () => {
        // Add your order placement logic here
        console.log("Order placed:", {
            product,
            quantity,
            mobile,
            address,
            user: userData
        });
       
    };

    const handleCancel = () => {
        navigate(-1); 
    };

   
    if (!product) {
        return (
            <div>
                <Header />
                <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colorPalette.background.secondary }}>
                    <div className="text-center p-8 rounded-lg" style={{ backgroundColor: colorPalette.background.primary }}>
                        <p className="text-lg mb-4" style={{ color: colorPalette.text.primary }}>No product selected.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-2 rounded-lg transition-all duration-200"
                            style={{ backgroundColor: colorPalette.brand.primary, color: colorPalette.background.primary }}
                        >
                            Go Back to Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: colorPalette.background.secondary }}>
            <Header />
            <div className="container mx-auto px-4 py-8 max-w-6xl">
               
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: colorPalette.text.primary }}>
                        Complete Your Order
                    </h1>
                    <p className="text-sm" style={{ color: colorPalette.text.secondary }}>
                        Verify your details and finalize the purchase of your ethereal finds.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    <div>
                        <div className="rounded-lg p-6 mb-6" style={{ backgroundColor: colorPalette.background.primary }}>
                            <div className="flex items-center gap-3 mb-6">
                                <RiTruckLine style={{ color: colorPalette.brand.primary }} size={24} />
                                <h2 className="text-xl font-semibold" style={{ color: colorPalette.text.header }}>
                                    Shipping Address
                                </h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: colorPalette.text.secondary }}>
                                        Full Name
                                    </label>
                                    <p className="text-lg font-medium" style={{ color: colorPalette.text.primary }}>
                                        {userData.name || "Not provided"}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: colorPalette.text.secondary }}>
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="Enter mobile number"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                                        style={{
                                            borderColor: colorPalette.accent,
                                            backgroundColor: colorPalette.background.primary,
                                            color: colorPalette.text.primary
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: colorPalette.text.secondary }}>
                                        Address
                                    </label>
                                    <textarea
                                        placeholder="Enter your full address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        rows="3"
                                        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                                        style={{
                                            borderColor: colorPalette.accent,
                                            backgroundColor: colorPalette.background.primary,
                                            color: colorPalette.text.primary
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                   
                    <div>
                        <div className="rounded-lg p-6 sticky top-4" style={{ backgroundColor: colorPalette.background.primary }}>
                            <h2 className="text-xl font-semibold mb-4" style={{ color: colorPalette.text.header }}>
                                Order Summary
                            </h2>

                            
                            <div className="border-b pb-4 mb-4" style={{ borderColor: colorPalette.accent }}>
                                <div className="flex gap-4 mb-4">
                                    {product.image && (
                                        <img
                                            src={product.image}
                                            alt={product.prdname}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg mb-1" style={{ color: colorPalette.text.primary }}>
                                            {product.prdname}
                                        </h3>
                                        <p className="text-sm" style={{ color: colorPalette.text.secondary }}>
                                            {product.description || "No description available"}
                                        </p>
                                    </div>
                                </div>

                                
                                <div className="flex items-center justify-between">
                                    <p className="font-medium" style={{ color: colorPalette.text.secondary }}>Quantity</p>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => handleChangeQuantity(false)}
                                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                                            style={{
                                                backgroundColor: quantity > 1 ? colorPalette.brand.primary : colorPalette.status.disabled,
                                                color: colorPalette.background.primary
                                            }}
                                            disabled={quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="text-lg font-semibold min-w-[40px] text-center" style={{ color: colorPalette.text.primary }}>
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => handleChangeQuantity(true)}
                                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                                            style={{
                                                backgroundColor: colorPalette.brand.primary,
                                                color: colorPalette.background.primary
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <p style={{ color: colorPalette.text.secondary }}>Subtotal</p>
                                    <p className="font-medium" style={{ color: colorPalette.text.primary }}>
                                        ₹{product.price * quantity}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p style={{ color: colorPalette.text.secondary }}>Shipping</p>
                                    <p className="font-medium" style={{ color: colorPalette.status.success }}>Free</p>
                                </div>
                                <div className="border-t pt-3 mt-3" style={{ borderColor: colorPalette.accent }}>
                                    <div className="flex justify-between">
                                        <p className="text-lg font-bold" style={{ color: colorPalette.text.primary }}>Total</p>
                                        <p className="text-xl font-bold" style={{ color: colorPalette.brand.secondary }}>
                                            ₹{quantity * product.price}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="space-y-3">
                                <button
                                    onClick={handlePlaceOrder}
                                    className="w-full py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 hover:scale-105 transform"
                                    style={{
                                        backgroundColor: colorPalette.cta,
                                        color: colorPalette.background.primary
                                    }}
                                >
                                    Place Order
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="w-full py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-80"
                                    style={{
                                        backgroundColor: colorPalette.background.secondary,
                                        color: colorPalette.text.secondary,
                                        border: `1px solid ${colorPalette.accent}`
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderProduct;
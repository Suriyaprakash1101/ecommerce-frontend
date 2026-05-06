

import React from "react";
import { useApp } from "./AppContext";
import { RiShoppingBagLine } from '@remixicon/react'
import { useNavigate } from "react-router-dom";

const ProductCard = (props) => {
    const context = useApp();
    const colorPalette = context.colorPalette;
    const navigation = useNavigate();

    return (
        <div className="w-[300px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="h-[200px] bg-gray-100 flex items-center justify-center rounded-t-lg">
                <RiShoppingBagLine size={48} className="text-gray-400" />
            </div>

            <div className="p-4">
                <p className="font-medium text-[13px] uppercase tracking-wide" style={{ color: colorPalette.brand.primary }}>
                    {props.prd.category || 'Product'}
                </p>
                <p className="font-semibold text-lg mt-1">{props.prd.prdname}</p>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{props.prd.description}</p>
                <p className="font-semibold text-xl mt-2" style={{ color: colorPalette.text.header }}>
                    ${props.prd.price}
                </p>

                {props.prd.quantity > 0 ? (
                    <p className="text-green-600 text-xs mt-1">In Stock ({props.prd.quantity} available)</p>
                ) : (
                    <p className="text-red-600 text-xs mt-1">Out of Stock</p>
                )}

                <div className="flex flex-row gap-2 text-center border-2 border-gray-200 pb-2 pt-2 justify-center hover:cursor-pointer hover:bg-gray-50 rounded-lg mt-3 transition-colors">
                    <RiShoppingBagLine size={18} />
                    <button className="hover:cursor-pointer font-medium" onClick={() => {
                        navigation('/order', {
                            state: { product: props.prd }
                        })
                    }}>
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
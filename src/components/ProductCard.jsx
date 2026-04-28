import React from "react";
import { useApp } from "./AppContext";
import {RiShoppingBagLine} from '@remixicon/react'

const ProductCard = (props) => {
    const context = useApp();
    const colorPalette = context.colorPalette;
    // console.log(props)
    return <div className="w-[300px] bg-white">
        <img className="h-[300px] w-[300]" src={props.prd.image} alt="Product image" />
        <div className="p-2">
            <p className="font-medium text-[13px]" style={{ color: colorPalette.brand.primary }}>{props.prd.category}</p>
            <p className="font-semibold">{props.prd.prdname}</p>
            <p className="font-semibold" style={{color:colorPalette.text.header}}>${props.prd.price}</p>
            <div className="flex flex-row gap-2 text-center border-2 border-gray-200 pb-1 pt-1 justify-center hover:cursor-pointer">
                < RiShoppingBagLine  />
                <button className="hover:cursor-pointer">Order Now</button>

            </div>
        </div>

    </div>
}

export default ProductCard;
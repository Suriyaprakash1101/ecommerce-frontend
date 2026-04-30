import React, { useEffect, useState } from 'react'

import { useApp } from './AppContext'
import ProductCard from './ProductCard'


const Product = () => {
    const [item, setItem] = useState([])
    const [itemCount,setItemCount]=useState(0);
    const context = useApp();
    const colorPalette = context.colorPalette
    const getItem = context.product
    useEffect(() => {
        
        setItem(getItem)

    }, [])
    useEffect(()=>{
        setItemCount(item.length);
    },[item])

    const applyFilters = (category)=>{
        if(category === 'all'){
            setItem(getItem);
            return;
        }
        const prd = getItem.filter((i)=>i.category === category);
        setItem(prd);
    }

    return (
        <div className='pt-7 pb-4 pl-4 pr-4 ' style={{background:colorPalette.background.secondary}}>
            <div className='flex flex-row justify-between'>
                <p>Showing {itemCount} coastal treasures</p>
                <div className='flex flex-row gap-2 border-2 border-gray-200 bg-white pl-1.5'>
                    <p>sorted by:</p>
                    <select style={{color:colorPalette.text.header}} onClick={(e)=>applyFilters(e.target.value)}>
                        <option value="all">All</option>
                        <option value="perfume">Perfume</option>
                        <option value="clothing">Cloth</option>
                        <option value="electronics">Electronics</option>
                        <option value="watch">watch</option>
                    </select>
                </div>
            </div>
            <div className='flex flex-row gap-8 flex-wrap mt-10 justify-center'>   
            {
                item.map((prd)=>{
                    return (
                        <ProductCard key={prd.id} prd={prd}/>
                    )
                })
            }
          
            </div>
            <div className='border-b-2 border-gray-200 m-6'></div>

        </div>
       
    )

}

export default Product
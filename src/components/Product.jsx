import React, { useEffect, useState } from 'react'
import img1 from '../assets/perfume5.jpg'
import img2 from '../assets/perfume4.jpg'
import img3 from '../assets/perfume3.jpg'
import img4 from '../assets/airpods1.jpg'
import img5 from '../assets/cloth1.jpg'
import img6 from '../assets/watch1.jpg'
import img7 from '../assets/watch2.jpg'
import img8 from '../assets/cloth2.jpg'
import { useApp } from './AppContext'
import ProductCard from './ProductCard'


const Product = () => {
    const [item, setItem] = useState([])
    const [itemCount,setItemCount]=useState(0);
    const context = useApp();
    const colorPalette = context.colorPalette
    useEffect(() => {
        const getItem = [
            {
                id: 1,
                image: img1,
                prdname: "Rose Perfume",
                category: "perfume",
                prdDescription: "Luxury floral fragrance",
                price: 400,
                quantity: 50,
                rating: 4
            },
            {
                id: 2,
                image: img2,
                prdname: "Vanilla Perfume",
                category: "perfume",
                prdDescription: "Sweet vanilla essence",
                price: 450,
                quantity: 35,
                rating: 5
            },
            {
                id: 3,
                image: img3,
                prdname: "Ocean Perfume",
                category: "perfume",
                prdDescription: "Fresh aquatic fragrance",
                price: 500,
                quantity: 25,
                rating: 4
            },
            {
                id: 4,
                image: img4,
                prdname: "AirPods Pro",
                category: "electronics",
                prdDescription: "Wireless Bluetooth Earbuds",
                price: 2499,
                quantity: 15,
                rating: 5
            },
            {
                id: 5,
                image: img5,
                prdname: "Casual Shirt",
                category: "clothing",
                prdDescription: "Cotton slim-fit shirt",
                price: 899,
                quantity: 40,
                rating: 4
            },
            {
                id: 6,
                image: img6,
                prdname: "Classic Watch",
                category: "watch",
                prdDescription: "Elegant analog watch",
                price: 1999,
                quantity: 20,
                rating: 5
            },
            {
                id: 7,
                image: img7,
                prdname: "Sport Watch",
                category: "watch",
                prdDescription: "Water-resistant sports watch",
                price: 1799,
                quantity: 18,
                rating: 4
            },
            {
                id: 8,
                image: img8,
                prdname: "Casual Shirt",
                category: "clothing",
                prdDescription: "Cotton slim-fit shirt",
                price: 899,
                quantity: 40,
                rating: 4
            },
        ];
        setItem(getItem)

    }, [])
    useEffect(()=>{
        setItemCount(item.length);
    },[item])

    return (
        <div className='pt-7 pb-4 pl-4 pr-4 ' style={{background:colorPalette.background.secondary}}>
            <div className='flex flex-row justify-between'>
                <p>Showing {itemCount} coastal treasures</p>
                <div className='flex flex-row gap-2 border-2 border-gray-200 bg-white pl-1.5'>
                    <p>sorted by:</p>
                    <select style={{color:colorPalette.text.header}}>
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
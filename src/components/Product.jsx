

import React, { useEffect, useState } from 'react';
import { useApp } from './AppContext';
import ProductCard from './ProductCard';
import { 
    getAllCategories, 
    getProductsByCategory, 
    getAllProducts
} from '../Api/productApi';

const Product = () => {
    const [items, setItems] = useState([]);
    const [itemCount, setItemCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const [categoryMap, setCategoryMap] = useState({});
    
    const context = useApp();
    const colorPalette = context.colorPalette;
    const itemsPerPage = 12;
  


    
    const fetchCategories = async () => {
        try {
            const response = await getAllCategories();
            const categoriesData = response.data;
            setCategories(categoriesData);
            
            // Create a map of category_id to category_name for easy lookup
            const map = {};
            categoriesData.forEach(cat => {
                map[cat.category_id] = cat.category_name;
            });
            setCategoryMap(map);
            
            return categoriesData;
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError('Failed to load categories');
            return [];
        }
    };

    
    const fetchProducts = async (categoryValue, page = 1) => {
        setLoading(true);
        setError(null);
        
        try {
            const skip = (page - 1) * itemsPerPage;
            let response;
            
            if (categoryValue === 'all') {
                
                response = await getAllProducts({ skip, limit: itemsPerPage });
            } else {
                
                response = await getProductsByCategory(categoryValue, skip, itemsPerPage);
            }
            
            const data = response.data;
            
            const transformedProducts = data.items.map(product => ({
                id: product.product_id,
                product_id: product.product_id,
                prdname: product.product_name,
                name: product.product_name,
                description: product.description,
                price: product.price,
                quantity: product.quantity,
                category_id: product.category_id,
                category: categoryMap[product.category_id] || 'Unknown'
            }));
            
            setItems(transformedProducts);
            setItemCount(data.total);
            setTotalPages(data.pages);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err.response?.data?.detail || 'Failed to load products');
        } finally {
            setLoading(false);
        }
    };


    const applyFilters = async (categoryValue) => {
        setSelectedCategory(categoryValue);
        setCurrentPage(1);
        await fetchProducts(categoryValue, 1);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

 
    useEffect(() => {
        const initialize = async () => {
            await fetchCategories();
            await fetchProducts('all', 1);
        };
        initialize();
    }, []);

    useEffect(() => {
        if (categories.length > 0 || selectedCategory === 'all') {
            fetchProducts(selectedCategory, currentPage);
        }
    }, [currentPage]);

    if (loading) {
        return (
            <div className='flex justify-center items-center h-64' style={{background: colorPalette.background.secondary}}>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
                    <p className='mt-4'>Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex justify-center items-center h-64' style={{background: colorPalette.background.secondary}}>
                <div className='text-center text-red-500'>
                    <p>Error: {error}</p>
                    <button 
                        onClick={() => fetchProducts(selectedCategory, currentPage)}
                        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='pt-7 pb-4 pl-4 pr-4' style={{background: colorPalette.background.secondary}}>
            <div className='flex flex-row justify-between flex-wrap gap-4'>
                <p>Showing {itemCount} products</p>
                <div className='flex flex-row gap-2 border-2 border-gray-200 bg-white pl-1.5'>
                    <p>Sort by:</p>
                    <select 
                        style={{color: colorPalette.text.header}} 
                        onChange={(e) => applyFilters(e.target.value)}
                        value={selectedCategory}
                    >
                        <option value="all">All Categories</option>
                        {categories.map(category => (
                            <option key={category.category_id} value={category.category_id}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            
            <div className='flex flex-row gap-8 flex-wrap mt-10 justify-center'>
                {items.length > 0 ? (
                    items.map((prd) => (
                        <ProductCard key={prd.id} prd={prd} />
                    ))
                ) : (
                    <div className='text-center py-10'>
                        <p className='text-gray-500'>No products found</p>
                    </div>
                )}
            </div>
            
            
            {totalPages > 1 && (
                <div className='flex justify-center gap-2 mt-8'>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className='px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100'
                    >
                        Previous
                    </button>
                    <span className='px-4 py-2'>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className='px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100'
                    >
                        Next
                    </button>
                </div>
            )}
            
            <div className='border-b-2 border-gray-200 m-6'></div>
        </div>
    );
};

export default Product;

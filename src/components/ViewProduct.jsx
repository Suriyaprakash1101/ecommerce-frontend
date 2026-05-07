

import React, { useState, useEffect } from "react";
import { RiPencilLine, RiDeleteBinLine } from '@remixicon/react';
import { getAllProducts } from "../Api/productApi";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useApp } from "./AppContext";

const ViewProduct = () => {
    const context = useApp();
    const color = context.colorPalette;
    const navigate = useNavigate();
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 20;

    // Fetch all products on component mount or page change
    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const skip = (currentPage - 1) * itemsPerPage;
            
            const response = await getAllProducts({
                limit: itemsPerPage,
                skip: skip,
                
            });
            
           
            if (response?.data?.items) {
                setProducts(response.data.items);
                
                if (response.data.total) {
                    setTotalProducts(response.data.total);
                    setTotalPages(Math.ceil(response.data.total / itemsPerPage));
                }
            } else if (Array.isArray(response?.data)) {
                setProducts(response.data);
                setTotalProducts(response.data.length);
                setTotalPages(Math.ceil(response.data.length / itemsPerPage));
            } else {
                setProducts([]);
                setTotalProducts(0);
                setTotalPages(0);
            }
            setError(null);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load products. Please try again later.');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        console.log("Edit product:", product);
        // Navigate to edit page or open edit modal
        navigate('/addNewProduct', { state: { product } });
    };

    const handleDelete = async (productId) => {
        console.log("Delete product:", productId);
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                // Uncomment and implement delete API call
                // await deleteProduct(productId);
                // Refresh the product list after deletion
                await fetchProducts();
            } catch (err) {
                console.error('Error deleting product:', err);
                alert('Failed to delete product. Please try again.');
            }
        }
    };

    
    const formatPrice = (price) => {
        return typeof price === 'number' ? price.toFixed(2) : price;
    };

    
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

   
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }
        
        return pageNumbers;
    };

    if (loading) {
        return (
            <div>
                <Header />
                <div className="p-6 flex justify-center items-center min-h-[400px]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading products...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Header />
                <div className="p-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <p className="text-red-600">{error}</p>
                        <button 
                            onClick={fetchProducts}
                            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Calculate showing range
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalProducts);

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
                            <div className="p-2 hover:bg-gray-50 rounded-md cursor-pointer" onClick={()=>{navigate('/addNewProduct')}}>
                                Add Products
                            </div>
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-md cursor-pointer">
                                View Products
                            </div>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="mb-4 pb-3 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800">Product Inventory</h3>
                            <p className="text-gray-500 text-sm mt-1">Manage and view all your products</p>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">View Products</h3>
                            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                Showing {startItem} - {endItem} of {totalProducts} products
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto shadow-md rounded-lg">
                            <table className="min-w-full bg-white rounded-lg">
                                <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">S.No</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Product Name</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Stock</th>
                                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {products.length > 0 ? (
                                        products.map((product, index) => (
                                            <tr key={product.product_id || product.id || index} className="hover:bg-gray-50 transition duration-200">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {product.product_name || product.prdname || product.name}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                                                    {product.description || '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-semibold">
                                                    ${formatPrice(product.price)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        product.quantity > 10 ? 'bg-green-100 text-green-700' : 
                                                        product.quantity > 0 ? 'bg-yellow-100 text-yellow-700' : 
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                        {product.quantity || 0}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <div className="flex gap-3 justify-center items-center">
                                                        <button
                                                            onClick={() => handleEdit(product)}
                                                            className="text-blue-600 hover:text-blue-800 transition-colors"
                                                            title="Edit product"
                                                        >
                                                            <RiPencilLine className="text-lg" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(product.product_id || product.id)}
                                                            className="text-red-600 hover:text-red-800 transition-colors"
                                                            title="Delete product"
                                                        >
                                                            <RiDeleteBinLine className="text-lg" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center">
                                                <div className="text-gray-500 text-lg">No products found</div>
                                                <p className="text-gray-400 text-sm mt-1">Add some products to get started</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Component */}
                        {totalPages > 1 && (
                            <div className="flex justify-between items-center mt-6">
                                <div className="text-sm text-gray-600">
                                    Page {currentPage} of {totalPages}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={goToPreviousPage}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 rounded-md transition-colors ${
                                            currentPage === 1
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        Previous
                                    </button>
                                    
                                    <div className="flex gap-1">
                                        {getPageNumbers().map((pageNum, index) => (
                                            <button
                                                key={index}
                                                onClick={() => typeof pageNum === 'number' && goToPage(pageNum)}
                                                className={`px-4 py-2 rounded-md transition-colors ${
                                                    currentPage === pageNum
                                                        ? 'bg-blue-600 text-white'
                                                        : pageNum === '...'
                                                        ? 'bg-transparent text-gray-600 cursor-default'
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                                disabled={pageNum === '...'}
                                            >
                                                {pageNum}
                                            </button>
                                        ))}
                                    </div>
                                    
                                    <button
                                        onClick={goToNextPage}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-2 rounded-md transition-colors ${
                                            currentPage === totalPages
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        Next
                                    </button>
                                </div>
                                
                                <div className="text-sm text-gray-600">
                                    Showing {itemsPerPage} items per page
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
import React, { useState, useEffect } from "react";
import { useApp } from "./AppContext";
import { RiPencilLine, RiDeleteBinLine } from '@remixicon/react';

const ViewProduct = () => {
    const [item, setItem] = useState([]);
    const context = useApp();

    useEffect(() => {
        setItem(context.product);
    }, [context.product]);

    const handleEdit = (product) => {
        console.log("Edit product:", product);
    };

    const handleDelete = (productId) => {
        console.log("Delete product:", productId);
        if (window.confirm("Are you sure you want to delete this product?")) {
            // context.deleteProduct(productId);
        }
    };

    return (
        <div className="p-6">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">View Products</h3>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white rounded-lg">
                    <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">S.No</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-4 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {item && item.length > 0 ? (
                            item.map((i, index) => (
                                <tr key={i.id || index} className="hover:bg-gray-50 transition duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i.prdname}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                            {i.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-semibold">
                                        ${i.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            i.quantity > 10 ? 'bg-green-100 text-green-700' : 
                                            i.quantity > 0 ? 'bg-yellow-100 text-yellow-700' : 
                                            'bg-red-100 text-red-700'
                                        }`}>
                                            {i.quantity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex gap-3 justify-center items-center">
                                            <button
                                                onClick={() => handleEdit(i)}
                                                className="text-blue-600 hover:text-blue-800 transition-colors"
                                                title="Edit product"
                                            >
                                                <RiPencilLine className="text-lg" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(i.id)}
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
        </div>
    );
};

export default ViewProduct;
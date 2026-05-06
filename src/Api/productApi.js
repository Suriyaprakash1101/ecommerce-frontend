
import axios from "axios";
import Config from "../Config";

const api_url = Config.API_URL;

export const getAuthToken = () => {
    const token = localStorage.getItem('access_token');
    return token;
};

const apiClient = axios.create({
    baseURL: api_url,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const getAllCategories = async () => {
    try {
        const response = await apiClient.get('/products/categories');
        console.log('Categories fetched:', response.data);
        return response;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const getCategoryById = async (categoryId) => {
    try {
        const response = await apiClient.get(`/products/categories/${categoryId}`);
        return response;
    } catch (error) {
        console.error('Error fetching category:', error);
        throw error;
    }
};

export const createCategory = async (categoryData) => {
    try {
        const response = await apiClient.post('/products/categories', categoryData);
        console.log('Category created:', response.data);
        return response;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

export const getProductsByCategory = async (categoryId, skip = 0, limit = 12) => {
    try {
        const response = await apiClient.get(`/products/category/${categoryId}/products?skip=${skip}&limit=${limit}`);
        return response;
    } catch (error) {
        console.error(`Error fetching products for category ${categoryId}:`, error);
        throw error;
    }
};


export const getProductById = async (productId) => {
    try {
        const response = await apiClient.get(`/products/${productId}`);
        return response;
    } catch (error) {
        console.error(`Error fetching product ${productId}:`, error);
        throw error;
    }
};



export const bulkCreateProducts = async (categoryId, products) => {
    try {
        const response = await apiClient.post(`/products/category/${categoryId}/bulk-products`, {
            products: products
        });
        console.log('Bulk products created:', response.data);
        return response;
    } catch (error) {
        console.error('Error creating bulk products:', error);
        throw error;
    }
};


export const updateProduct = async (productId, productData) => {
    try {
        const response = await apiClient.patch(`/products/${productId}`, productData);
        console.log('Product updated:', response.data);
        return response;
    } catch (error) {
        console.error(`Error updating product ${productId}:`, error);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await apiClient.delete(`/products/${productId}`);
        console.log('Product deleted successfully');
        return response;
    } catch (error) {
        console.error(`Error deleting product ${productId}:`, error);
        throw error;
    }
};


export const getCategoryNameById = (categories, categoryId) => {
    const category = categories.find(cat => cat.category_id === categoryId);
    return category ? category.category_name : 'Unknown';
};


export const enrichProductsWithCategoryNames = (products, categories) => {
    return products.map(product => ({
        ...product,
        category_name: getCategoryNameById(categories, product.category_id)
    }));
};


export const getAllProducts = async (params = {}) => {
    try {
        const queryParams = new URLSearchParams();
        
        if (params.skip !== undefined) queryParams.append('skip', params.skip);
        if (params.limit !== undefined) queryParams.append('limit', params.limit);
        if (params.search) queryParams.append('search', params.search);
        if (params.category_id) queryParams.append('category_id', params.category_id);
        if (params.min_price) queryParams.append('min_price', params.min_price);
        if (params.max_price) queryParams.append('max_price', params.max_price);
        if (params.in_stock !== undefined) queryParams.append('in_stock', params.in_stock);
        
        const url = `/products/?${queryParams.toString()}`;
        const response = await apiClient.get(url);
        return response;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};



export const createProduct = async (productData) => {
    try {
        const response = await apiClient.post('/products/', productData);
        console.log('Product created:', response.data);
        return response;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};
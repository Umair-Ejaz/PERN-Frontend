import axios from "axios";

const API_URL = "http://localhost:3001/api/products"; // Change to your backend API URL

// Create a new product
export const createProduct = async (productData) => {
  try {
    const res = await axios.post(API_URL, productData);
    return res.data;
  } catch (err) {
    console.error("Error creating product:", err);
    throw err;
  }
};

// Get all products
export const getAllProducts = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching product:", err);
    throw err;
  }
};

// Update product by ID
export const updateProduct = async (id, productData) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, productData);
    return res.data;
  } catch (err) {
    console.error("Error updating product:", err);
    throw err;
  }
};

// Delete product by ID
export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting product:", err);
    throw err;
  }
};

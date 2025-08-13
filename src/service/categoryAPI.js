// src/services/categoryAPI.js
import axios from "axios";

const API_URL = "http://localhost:3001/api/categories"; // Change if needed

// Get all categories
export const getCategories = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Get category by ID
export const getCategoryById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Create category
export const createCategory = async (categoryData) => {
  const res = await axios.post(API_URL, categoryData);
  return res.data;
};

// Update category
export const updateCategory = async (id, categoryData) => {
  const res = await axios.put(`${API_URL}/${id}`, categoryData);
  return res.data;
};

// Delete category
export const deleteCategory = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

export default {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

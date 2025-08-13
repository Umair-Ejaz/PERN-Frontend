// src/services/orderAPI.js
import axios from "axios";

const API_URL = "http://localhost:3001/api/orders"; // Adjust base URL if needed

// Create a new order with items
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(API_URL, orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error creating order" };
  }
};

// Get all orders
export const getOrders = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error fetching orders" };
  }
};

// Get a single order by ID
export const getOrderById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error fetching order" };
  }
};

// Update order by ID (excluding items)
export const updateOrder = async (id, orderData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error updating order" };
  }
};

// Delete order
export const deleteOrder = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error deleting order" };
  }
};

export default {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};

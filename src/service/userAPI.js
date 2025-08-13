// src/services/userAPI.js
import axios from "axios";

const API_URL = "http://localhost:3001/api/users";

export const getUsers = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
};

export const getUserById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Error fetching user with id ${id}:`, err);
    throw err;
  }
};

export const createUser = async (userData) => {
  try {
    const res = await axios.post(API_URL, userData);
    return res.data;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, userData);
    return res.data;
  } catch (err) {
    console.error(`Error updating user with id ${id}:`, err);
    throw err;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Error deleting user with id ${id}:`, err);
    throw err;
  }
};

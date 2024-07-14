import axios from 'axios';

const API_URL = 'http://192.168.1.4:3000'; 

export const register = async (email, password) => {
    return await axios.post(`${API_URL}/user/register`, { email, password });
};

export const login = async (email, password) => {
    return await axios.post(`${API_URL}/user/login`, { email, password });
};

export const getTasks = async (token) => {
    return await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const addTask = async (token, task) => {
    return await axios.post(`${API_URL}/tasks`, task, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const updateTask = async (token, id, task) => {
    return await axios.put(`${API_URL}/tasks/${id}`, task, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteTask = async (token, id) => {
    return await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export const getTasks = async () => axios.get(API_URL);
export const createTask = async (task) => axios.post(API_URL, task);
export const updateTask = async (id, task) => axios.put(`${API_URL}/${id}`, task);
export const deleteTask = async (id) => axios.delete(`${API_URL}/${id}`);

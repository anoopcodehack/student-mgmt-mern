import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_URL });

export const getStudents = (search = "") =>
  api.get(`/students${search ? `?search=${encodeURIComponent(search)}` : ""}`);

export const getStudent = (id) => api.get(`/students/${id}`);

export const addStudent = (data) => api.post("/students", data);

export const updateStudent = (id, data) => api.put(`/students/${id}`, data);

export const deleteStudent = (id) => api.delete(`/students/${id}`);

export default api;

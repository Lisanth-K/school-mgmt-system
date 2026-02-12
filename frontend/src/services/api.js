import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Auth
export const loginAdmin = (credentials) => axios.post(`${API_URL}/auth/login`, credentials);

// Academic Year - Ippo idhu dhaan namakku thevai
export const getAcademicYears = () => axios.get(`${API_URL}/academic-years`);
export const createAcademicYear = (data) => axios.post(`${API_URL}/academic-years`, data);
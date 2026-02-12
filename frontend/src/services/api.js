import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Common Axios Instance
const API = axios.create({ baseURL: API_URL });

// --- Authentication ---
export const loginAdmin = (credentials) => API.post('/auth/login', credentials);

// --- Academic Year ---
export const getAcademicYears = () => API.get('/academic-years');
export const createAcademicYear = (data) => API.post('/academic-years', data);
export const toggleYearStatus = (id) => API.put(`/academic-years/status/${id}`);

// --- Class Management ---
export const getClasses = () => API.get('/classes');
export const createClass = (data) => API.post('/classes', data);
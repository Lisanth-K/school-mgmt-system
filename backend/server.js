import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// 1. All Routes Import
import academicYearRoutes from './routes/academicYearRoutes.js';
import authRoutes from './routes/authRoutes.js';
import classRoutes from './routes/classRoutes.js'; // Puthiya class route

dotenv.config();

const app = express();

// 2. Middleware setup
app.use(cors());
app.use(express.json());

// 3. API Routes setup (Ellame ore 'app' kulla irukanum)
app.use('/api/academic-years', academicYearRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes); // Intha line correct-ah inga irukanum

// 4. Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
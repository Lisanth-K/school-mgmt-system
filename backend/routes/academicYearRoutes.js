import express from 'express';
import { 
    getAcademicYears, 
    createAcademicYear, 
    updateYearStatus // Intha controller function-ah import pannanum
} from '../controllers/academicYearController.js';

const router = express.Router();

// 1. Get all years
router.get('/', getAcademicYears);

// 2. Create a new year
router.post('/', createAcademicYear);

// 3. Update status (Activate one year and archive others)
// Path: /api/academic-years/status/:id
router.put('/status/:id', updateYearStatus);

export default router;
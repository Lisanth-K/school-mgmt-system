import express from 'express';
import { getAcademicYears, createAcademicYear } from '../controllers/academicYearController.js';

const router = express.Router();

router.get('/', getAcademicYears);
router.post('/', createAcademicYear);

export default router;
// routes/classRoutes.js
import express from 'express';
import { getClasses, createClass } from '../controllers/classController.js';

const router = express.Router();

// Ippadi irukkanum:
router.get('/', getClasses);  // Server-la it will be /api/classes
router.post('/', createClass); 

export default router;
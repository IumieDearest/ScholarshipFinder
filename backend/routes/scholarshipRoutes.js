import express from 'express';
import { getScholarships, createScholarship, updateScholarship, deleteScholarship } from '../controllers/scholarshipController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getScholarships);
router.post('/', authenticateToken, requireRole(['Provider']), createScholarship);
router.put('/:id', authenticateToken, requireRole(['Provider']), updateScholarship);
router.delete('/:id', authenticateToken, requireRole(['Provider']), deleteScholarship);

export default router;
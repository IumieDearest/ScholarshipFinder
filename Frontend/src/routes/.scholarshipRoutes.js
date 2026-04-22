import express from 'express';
import { 
  createScholarship, 
  getScholarships, 
  getScholarshipById, 
  updateScholarship, 
  deleteScholarship,
  getProviderScholarships 
} from '../../../backend/controllers/scholarshipController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getScholarships);
router.get('/:id', getScholarshipById);

// Provider routes
router.post('/', authenticateToken, requireRole(['Provider']), createScholarship);
router.put('/:id', authenticateToken, requireRole(['Provider']), updateScholarship);
router.delete('/:id', authenticateToken, requireRole(['Provider']), deleteScholarship);
router.get('/provider/my-scholarships', authenticateToken, requireRole(['Provider']), getProviderScholarships);

export default router;
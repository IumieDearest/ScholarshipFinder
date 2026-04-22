import express from 'express';
import { 
  submitApplication, 
  getStudentApplications, 
  getApplicationById, 
  updateApplicationStatus,
  getProviderApplications,
  withdrawApplication 
} from '../../../backend/controllers/applicationController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Student routes
router.post('/submit', authenticateToken, requireRole(['Student']), submitApplication);
router.get('/my-applications', authenticateToken, requireRole(['Student']), getStudentApplications);
router.delete('/:id/withdraw', authenticateToken, requireRole(['Student']), withdrawApplication);

// Provider routes
router.get('/provider/applicants', authenticateToken, requireRole(['Provider']), getProviderApplications);
router.put('/:id/status', authenticateToken, requireRole(['Provider']), updateApplicationStatus);

// Get single application (both student and provider can access)
router.get('/:id', authenticateToken, getApplicationById);

export default router;
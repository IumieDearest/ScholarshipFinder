import express from 'express';
import { submitApplication, getStudentApplications, getApplicationById, updateApplicationStatus, getProviderApplications, withdrawApplication } from '../controllers/applicationController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/submit', authenticateToken, requireRole(['Student']), submitApplication);
router.get('/my-applications', authenticateToken, requireRole(['Student']), getStudentApplications);
router.delete('/:id/withdraw', authenticateToken, requireRole(['Student']), withdrawApplication);
router.get('/provider/applicants', authenticateToken, requireRole(['Provider']), getProviderApplications);
router.put('/:id/status', authenticateToken, requireRole(['Provider']), updateApplicationStatus);
router.get('/:id', authenticateToken, getApplicationById);

export default router;
import express from 'express';
import { saveSurvey, checkSurveyCompletion, getSurveyData } from '../../../backend/controllers/surveyController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/save', authenticateToken, requireRole(['Student']), saveSurvey);
router.get('/check', authenticateToken, requireRole(['Student']), checkSurveyCompletion);
router.get('/data', authenticateToken, requireRole(['Student']), getSurveyData);

export default router;
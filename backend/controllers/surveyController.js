// controllers/surveyController.js
// Survey handling: save survey responses, check completion

import { getDatabase } from '../config/database.js';
import { generateId } from '../utils/helpers.js';

export async function saveSurvey(req, res) {
  try {
    const { academicLevel, fieldOfStudy, gpa, financialNeed, ethnicity, location, specializations, workExperience, leadership, volunteer } = req.body;
    const studentId = req.user.id;

    const db = getDatabase();

    // Check if survey already exists
    const existingSurvey = await db.get(
      'SELECT id FROM surveyResponses WHERE studentId = ?',
      [studentId]
    );

    if (existingSurvey) {
      return res.status(400).json({ error: 'Survey already completed. You can only complete it once.' });
    }

    // Save survey response
    const surveyId = generateId();
    const now = new Date().toISOString();

    await db.run(
      `INSERT INTO surveyResponses (id, studentId, academicLevel, fieldOfStudy, gpa, financialNeed, ethnicity, location, specializations, workExperience, leadership, volunteer, completedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [surveyId, studentId, academicLevel, fieldOfStudy, gpa, financialNeed, ethnicity, location, JSON.stringify(specializations), workExperience, leadership ? 1 : 0, volunteer ? 1 : 0, now]
    );

    // Update student profile
    await db.run(
      `UPDATE studentProfiles SET academicLevel = ?, fieldOfStudy = ?, gpa = ?, financialNeed = ?, ethnicity = ?, location = ?, specializations = ?, workExperience = ?, leadership = ?, volunteer = ?, surveyCompleted = 1, updatedAt = ?
       WHERE userId = ?`,
      [academicLevel, fieldOfStudy, gpa, financialNeed, ethnicity, location, JSON.stringify(specializations), workExperience, leadership ? 1 : 0, volunteer ? 1 : 0, now, studentId]
    );

    res.status(201).json({
      message: 'Survey completed successfully',
      surveyId
    });
  } catch (error) {
    console.error('Save survey error:', error);
    res.status(500).json({ error: 'Failed to save survey' });
  }
}

export async function checkSurveyCompletion(req, res) {
  try {
    const studentId = req.user.id;
    const db = getDatabase();

    const survey = await db.get(
      'SELECT id FROM surveyResponses WHERE studentId = ?',
      [studentId]
    );

    res.json({ completed: !!survey });
  } catch (error) {
    console.error('Check survey error:', error);
    res.status(500).json({ error: 'Failed to check survey status' });
  }
}

export async function getSurveyData(req, res) {
  try {
    const studentId = req.user.id;
    const db = getDatabase();

    const survey = await db.get(
      'SELECT * FROM surveyResponses WHERE studentId = ?',
      [studentId]
    );

    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    // Parse JSON fields
    survey.specializations = JSON.parse(survey.specializations || '[]');
    survey.leadership = !!survey.leadership;
    survey.volunteer = !!survey.volunteer;

    res.json({ survey });
  } catch (error) {
    console.error('Get survey error:', error);
    res.status(500).json({ error: 'Failed to fetch survey data' });
  }
}
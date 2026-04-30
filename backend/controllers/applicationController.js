import { getDatabase } from '../config/database.js';
import { generateId } from '../utils/helpers.js';

export async function submitApplication(req, res) {
  try {
    const { scholarshipId } = req.body;
    const studentId = req.user.id;

    if (!scholarshipId) {
      return res.status(400).json({ error: 'Scholarship ID is required' });
    }

    const db = getDatabase();

    // Check if scholarship exists
    const scholarship = await db.get(
      'SELECT id FROM scholarships WHERE id = ?',
      [scholarshipId]
    );

    if (!scholarship) {
      return res.status(404).json({ error: 'Scholarship not found' });
    }

    // Check if already applied
    const existingApplication = await db.get(
      'SELECT id FROM applications WHERE studentId = ? AND scholarshipId = ?',
      [studentId, scholarshipId]
    );

    if (existingApplication) {
      return res.status(400).json({ error: 'You have already applied for this scholarship' });
    }

    // Create application
    const applicationId = generateId();
    const now = new Date().toISOString();

    await db.run(
      `INSERT INTO applications (id, studentId, scholarshipId, submittedAt, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [applicationId, studentId, scholarshipId, now, now, now]
    );

    // Update applicant count
    await db.run(
      'UPDATE scholarships SET applicantCount = applicantCount + 1 WHERE id = ?',
      [scholarshipId]
    );

    res.status(201).json({
      message: 'Application submitted successfully',
      applicationId
    });
  } catch (error) {
    console.error('Submit application error:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
}

export async function getStudentApplications(req, res) {
  try {
    const studentId = req.user.id;
    const db = getDatabase();

    const applications = await db.all(
      `SELECT a.*, s.title, s.amount, s.deadline
       FROM applications a
       JOIN scholarships s ON a.scholarshipId = s.id
       WHERE a.studentId = ?
       ORDER BY a.submittedAt DESC`,
      [studentId]
    );

    res.json({ applications });
  } catch (error) {
    console.error('Get student applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
}

export async function getApplicationById(req, res) {
  try {
    const { id } = req.params;
    const db = getDatabase();

    const application = await db.get(
      `SELECT a.*, s.title, s.description, s.amount, s.deadline, u.name as studentName, u.email as studentEmail
       FROM applications a
       JOIN scholarships s ON a.scholarshipId = s.id
       JOIN users u ON a.studentId = u.id
       WHERE a.id = ?`,
      [id]
    );

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({ application });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ error: 'Failed to fetch application' });
  }
}

export async function updateApplicationStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const providerId = req.user.id;

    const db = getDatabase();

    // Get application with scholarship info
    const application = await db.get(
      `SELECT a.*, s.providerId
       FROM applications a
       JOIN scholarships s ON a.scholarshipId = s.id
       WHERE a.id = ?`,
      [id]
    );

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Check authorization
    if (application.providerId !== providerId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const now = new Date().toISOString();

    await db.run(
      `UPDATE applications SET status = ?, notes = ?, reviewedAt = ?, reviewedBy = ?, updatedAt = ?
       WHERE id = ?`,
      [status, notes, now, providerId, now, id]
    );

    res.json({ message: 'Application status updated successfully' });
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({ error: 'Failed to update application' });
  }
}

export async function getProviderApplications(req, res) {
  try {
    const providerId = req.user.id;
    const db = getDatabase();

    const applications = await db.all(
      `SELECT a.*, s.title, u.name as studentName, u.email as studentEmail
       FROM applications a
       JOIN scholarships s ON a.scholarshipId = s.id
       JOIN users u ON a.studentId = u.id
       WHERE s.providerId = ?
       ORDER BY a.submittedAt DESC`,
      [providerId]
    );

    res.json({ applications });
  } catch (error) {
    console.error('Get provider applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
}

export async function withdrawApplication(req, res) {
  try {
    const { id } = req.params;
    const studentId = req.user.id;
    const db = getDatabase();

    // Check ownership
    const application = await db.get(
      'SELECT studentId FROM applications WHERE id = ?',
      [id]
    );

    if (!application || application.studentId !== studentId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const now = new Date().toISOString();

    await db.run(
      'UPDATE applications SET status = "Withdrawn", updatedAt = ? WHERE id = ?',
      [now, id]
    );

    res.json({ message: 'Application withdrawn successfully' });
  } catch (error) {
    console.error('Withdraw application error:', error);
    res.status(500).json({ error: 'Failed to withdraw application' });
  }
}

// Controller function to get all verification requests for a school
export async function getSchoolVerificationRequests(req, res) {
  try {
    const schoolId = req.user.id;
    const db = getDatabase();

    const verificationRequests = await db.all(
      `SELECT vr.*, u.name as studentName, u.email as studentEmail
       FROM verificationrecords vr
       JOIN users u ON vr.studentId = u.id
       WHERE vr.schoolId = ?
       ORDER BY vr.createdAt DESC`,
      [schoolId]
    );

    res.json({ verificationRequests });
  } catch (error) {
    console.error('Get school verification requests error:', error);
    res.status(500).json({ error: 'Failed to fetch verification requests' });
  }
}

// Controller function to update the status of a student verification request
export async function updateVerificationStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const schoolId = req.user.id;
    const db = getDatabase();

    // Check if the verification record exists and belongs to the school
    const verificationRecord = await db.get(
      'SELECT schoolId FROM verificationrecords WHERE id = ?',
      [id]
    );

    if (!verificationRecord || verificationRecord.schoolId !== schoolId) {
      return res.status(403).json({ error: 'Unauthorized or verification record not found' });
    }

    const now = new Date().toISOString();

    await db.run(
      'UPDATE verificationrecords SET status = ?, verificationDate = ?, updatedAt = ? WHERE id = ?',
      [status, now, now, id]
    );

    res.json({ message: 'Verification status updated successfully' });
  } catch (error) {
    console.error('Update verification status error:', error);
    res.status(500).json({ error: 'Failed to update verification status' });
  }
}
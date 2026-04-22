import { getDatabase } from '../config/database.js';
import { generateId } from '../utils/helpers.js';

export async function createScholarship(req, res) {
  try {
    const { title, description, amount, deadline, requirements, fieldOfStudy, academicLevel } = req.body;
    const providerId = req.user.id;

    if (!title || !description || !amount) {
      return res.status(400).json({ error: 'Title, description, and amount are required' });
    }

    const db = getDatabase();
    const scholarshipId = generateId();
    const now = new Date().toISOString();

    await db.run(
      `INSERT INTO scholarships (id, providerId, title, description, amount, deadline, requirements, fieldOfStudy, academicLevel, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [scholarshipId, providerId, title, description, amount, deadline, requirements, fieldOfStudy, academicLevel, now, now]
    );

    res.status(201).json({
      message: 'Scholarship created successfully',
      scholarshipId
    });
  } catch (error) {
    console.error('Create scholarship error:', error);
    res.status(500).json({ error: 'Failed to create scholarship' });
  }
}

export async function getScholarships(req, res) {
  try {
    const { fieldOfStudy, academicLevel, search } = req.query;
    const db = getDatabase();

    let query = 'SELECT * FROM scholarships WHERE status = "Active"';
    const params = [];

    if (fieldOfStudy) {
      query += ' AND fieldOfStudy = ?';
      params.push(fieldOfStudy);
    }

    if (academicLevel) {
      query += ' AND academicLevel = ?';
      params.push(academicLevel);
    }

    if (search) {
      query += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY createdAt DESC';

    const scholarships = await db.all(query, params);

    res.json({ scholarships });
  } catch (error) {
    console.error('Get scholarships error:', error);
    res.status(500).json({ error: 'Failed to fetch scholarships' });
  }
}

export async function getScholarshipById(req, res) {
  try {
    const { id } = req.params;
    const db = getDatabase();

    const scholarship = await db.get(
      'SELECT * FROM scholarships WHERE id = ?',
      [id]
    );

    if (!scholarship) {
      return res.status(404).json({ error: 'Scholarship not found' });
    }

    res.json({ scholarship });
  } catch (error) {
    console.error('Get scholarship error:', error);
    res.status(500).json({ error: 'Failed to fetch scholarship' });
  }
}

export async function updateScholarship(req, res) {
  try {
    const { id } = req.params;
    const { title, description, amount, deadline, requirements, fieldOfStudy, academicLevel, status } = req.body;
    const providerId = req.user.id;

    const db = getDatabase();

    // Check ownership
    const scholarship = await db.get(
      'SELECT providerId FROM scholarships WHERE id = ?',
      [id]
    );

    if (!scholarship || scholarship.providerId !== providerId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const now = new Date().toISOString();

    await db.run(
      `UPDATE scholarships SET title = ?, description = ?, amount = ?, deadline = ?, requirements = ?, fieldOfStudy = ?, academicLevel = ?, status = ?, updatedAt = ?
       WHERE id = ?`,
      [title, description, amount, deadline, requirements, fieldOfStudy, academicLevel, status, now, id]
    );

    res.json({ message: 'Scholarship updated successfully' });
  } catch (error) {
    console.error('Update scholarship error:', error);
    res.status(500).json({ error: 'Failed to update scholarship' });
  }
}

export async function deleteScholarship(req, res) {
  try {
    const { id } = req.params;
    const providerId = req.user.id;

    const db = getDatabase();

    // Check ownership
    const scholarship = await db.get(
      'SELECT providerId FROM scholarships WHERE id = ?',
      [id]
    );

    if (!scholarship || scholarship.providerId !== providerId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await db.run('DELETE FROM scholarships WHERE id = ?', [id]);

    res.json({ message: 'Scholarship deleted successfully' });
  } catch (error) {
    console.error('Delete scholarship error:', error);
    res.status(500).json({ error: 'Failed to delete scholarship' });
  }
}

export async function getProviderScholarships(req, res) {
  try {
    const providerId = req.user.id;
    const db = getDatabase();

    const scholarships = await db.all(
      'SELECT * FROM scholarships WHERE providerId = ? ORDER BY createdAt DESC',
      [providerId]
    );

    res.json({ scholarships });
  } catch (error) {
    console.error('Get provider scholarships error:', error);
    res.status(500).json({ error: 'Failed to fetch scholarships' });
  }
}
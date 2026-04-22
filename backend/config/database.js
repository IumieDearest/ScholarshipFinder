import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db = null;

export async function initializeDatabase() {
  try {
    const dbPath = path.join(__dirname, '../database/scholar.db');
    
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    await db.exec('PRAGMA foreign_keys = ON');

    // Create tables
    await createTables();
    
    console.log('✅ Database initialized successfully');
    return db;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

async function createTables() {
  // Users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      accountType TEXT NOT NULL CHECK(accountType IN ('Student', 'School', 'Provider')),
      profilePicture TEXT,
      bio TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Student profiles table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS studentProfiles (
      id TEXT PRIMARY KEY,
      userId TEXT UNIQUE NOT NULL,
      academicLevel TEXT,
      fieldOfStudy TEXT,
      gpa TEXT,
      financialNeed TEXT,
      ethnicity TEXT,
      location TEXT,
      specializations TEXT,
      workExperience TEXT,
      leadership BOOLEAN DEFAULT 0,
      volunteer BOOLEAN DEFAULT 0,
      surveyCompleted BOOLEAN DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Scholarships table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS scholarships (
      id TEXT PRIMARY KEY,
      providerId TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      amount REAL,
      deadline DATETIME,
      requirements TEXT,
      fieldOfStudy TEXT,
      academicLevel TEXT,
      status TEXT DEFAULT 'Active' CHECK(status IN ('Active', 'Closed', 'Archived')),
      applicantCount INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (providerId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Applications table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS applications (
      id TEXT PRIMARY KEY,
      studentId TEXT NOT NULL,
      scholarshipId TEXT NOT NULL,
      status TEXT DEFAULT 'Pending' CHECK(status IN ('Pending', 'Under Review', 'Accepted', 'Rejected', 'Withdrawn')),
      submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      reviewedAt DATETIME,
      reviewedBy TEXT,
      notes TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (scholarshipId) REFERENCES scholarships(id) ON DELETE CASCADE
    )
  `);

  // Survey responses table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS surveyResponses (
      id TEXT PRIMARY KEY,
      studentId TEXT UNIQUE NOT NULL,
      academicLevel TEXT,
      fieldOfStudy TEXT,
      gpa TEXT,
      financialNeed TEXT,
      ethnicity TEXT,
      location TEXT,
      specializations TEXT,
      workExperience TEXT,
      leadership BOOLEAN DEFAULT 0,
      volunteer BOOLEAN DEFAULT 0,
      completedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Documents table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS documents (
      id TEXT PRIMARY KEY,
      studentId TEXT NOT NULL,
      fileName TEXT NOT NULL,
      documentType TEXT NOT NULL,
      fileSize TEXT,
      uploadDate DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'Pending' CHECK(status IN ('Pending', 'Verified', 'Rejected')),
      filePath TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Provider verification queue table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS providerVerifications (
      id TEXT PRIMARY KEY,
      providerId TEXT UNIQUE NOT NULL,
      organizationName TEXT NOT NULL,
      registrationNumber TEXT,
      status TEXT DEFAULT 'Pending' CHECK(status IN ('Pending', 'Verified', 'Rejected')),
      submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      verifiedAt DATETIME,
      verifiedBy TEXT,
      notes TEXT,
      FOREIGN KEY (providerId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  console.log('✅ All tables created successfully');
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return db;
}

export async function closeDatabase() {
  if (db) {
    await db.close();
    console.log('✅ Database connection closed');
  }
}
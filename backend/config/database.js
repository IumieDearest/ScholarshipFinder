import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool = null;

export async function initializeDatabase() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'scholar_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Test connection
    const connection = await pool.getConnection();
    console.log('✅ MySQL Database Connected Successfully');
    console.log(`📊 Database: ${process.env.DB_NAME}`);
    console.log(`🖥️  Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    connection.release();

    // Create tables
    await createTables();

    return pool;
  } catch (error) {
    console.error('❌ Database Connection Error:', error.message);
    console.error('💡 Make sure:');
    console.error('   1. XAMPP MySQL is running');
    console.error('   2. Database "scholar_db" exists');
    console.error('   3. .env file has correct credentials');
    throw error;
  }
}

async function createTables() {
  try {
    const connection = await pool.getConnection();

    // Users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        accountType ENUM('Student', 'School', 'Provider') NOT NULL,
        profilePicture VARCHAR(255),
        bio TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_accountType (accountType)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Student profiles table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS studentProfiles (
        id VARCHAR(36) PRIMARY KEY,
        userId VARCHAR(36) UNIQUE NOT NULL,
        academicLevel VARCHAR(100),
        fieldOfStudy VARCHAR(100),
        gpa VARCHAR(10),
        financialNeed VARCHAR(50),
        ethnicity VARCHAR(100),
        location VARCHAR(255),
        specializations JSON,
        workExperience TEXT,
        leadership BOOLEAN DEFAULT FALSE,
        volunteer BOOLEAN DEFAULT FALSE,
        surveyCompleted BOOLEAN DEFAULT FALSE,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_userId (userId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Scholarships table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS scholarships (
        id VARCHAR(36) PRIMARY KEY,
        providerId VARCHAR(36) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        amount DECIMAL(10, 2),
        deadline DATETIME,
        requirements TEXT,
        fieldOfStudy VARCHAR(100),
        academicLevel VARCHAR(100),
        status ENUM('Active', 'Closed', 'Archived') DEFAULT 'Active',
        applicantCount INT DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (providerId) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_providerId (providerId),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Applications table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id VARCHAR(36) PRIMARY KEY,
        studentId VARCHAR(36) NOT NULL,
        scholarshipId VARCHAR(36) NOT NULL,
        status ENUM('Pending', 'Under Review', 'Accepted', 'Rejected', 'Withdrawn') DEFAULT 'Pending',
        submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        reviewedAt DATETIME,
        reviewedBy VARCHAR(36),
        notes TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (scholarshipId) REFERENCES scholarships(id) ON DELETE CASCADE,
        FOREIGN KEY (reviewedBy) REFERENCES users(id),
        INDEX idx_studentId (studentId),
        INDEX idx_scholarshipId (scholarshipId),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Survey responses table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS surveyResponses (
        id VARCHAR(36) PRIMARY KEY,
        studentId VARCHAR(36) UNIQUE NOT NULL,
        academicLevel VARCHAR(100),
        fieldOfStudy VARCHAR(100),
        gpa VARCHAR(10),
        financialNeed VARCHAR(50),
        ethnicity VARCHAR(100),
        location VARCHAR(255),
        specializations JSON,
        workExperience TEXT,
        leadership BOOLEAN DEFAULT FALSE,
        volunteer BOOLEAN DEFAULT FALSE,
        completedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_studentId (studentId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Documents table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id VARCHAR(36) PRIMARY KEY,
        studentId VARCHAR(36) NOT NULL,
        fileName VARCHAR(255) NOT NULL,
        documentType VARCHAR(100) NOT NULL,
        fileSize VARCHAR(50),
        uploadDate DATETIME DEFAULT CURRENT_TIMESTAMP,
        status ENUM('Pending', 'Verified', 'Rejected') DEFAULT 'Pending',
        filePath VARCHAR(255),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_studentId (studentId),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Provider verification table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS providerVerifications (
        id VARCHAR(36) PRIMARY KEY,
        providerId VARCHAR(36) UNIQUE NOT NULL,
        organizationName VARCHAR(255) NOT NULL,
        registrationNumber VARCHAR(100),
        status ENUM('Pending', 'Verified', 'Rejected') DEFAULT 'Pending',
        submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        verifiedAt DATETIME,
        verifiedBy VARCHAR(36),
        notes TEXT,
        FOREIGN KEY (providerId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (verifiedBy) REFERENCES users(id),
        INDEX idx_providerId (providerId),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ All database tables created successfully');
    connection.release();
  } catch (error) {
    console.error('❌ Error creating tables:', error.message);
    throw error;
  }
}

export function getDatabase() {
  if (!pool) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return pool;
}

export async function closeDatabase() {
  if (pool) {
    await pool.end();
    console.log('✅ Database connection closed');
  }
}
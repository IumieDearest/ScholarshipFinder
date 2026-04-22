// server.js
// Main Express server setup

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Import database and routes
import { initializeDatabase, closeDatabase } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import surveyRoutes from './routes/surveyRoutes.js';
import scholarshipRoutes from './routes/scholarshipRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create database directory if it doesn't exist
const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/survey', surveyRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/applications', applicationRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Initialize database and start server
async function startServer() {
  try {
    // Initialize database
    await initializeDatabase();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`

        ✅ Server running on http://localhost:${PORT}
📦 Database initialized
🔌 API endpoints ready

Available endpoints:
  POST   /api/auth/register
  POST   /api/auth/login
  GET    /api/auth/me
  
  POST   /api/survey/save
  GET    /api/survey/check
  GET    /api/survey/data
  
  GET    /api/scholarships
  POST   /api/scholarships (Provider only)
  
  POST   /api/applications/submit
  GET    /api/applications/my-applications
  GET    /api/applications/provider/applicants (Provider only)

Press Ctrl+C to stop the server
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  await closeDatabase();
  process.exit(0);
});

startServer();
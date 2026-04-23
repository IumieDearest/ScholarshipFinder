import { getDatabase } from '../config/database.js';
import { generateId, hashPassword, comparePassword } from '../utils/helpers.js';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
  try {
    const { name, email, password, accountType } = req.body;

    // Validation
    if (!name || !email || !password || !accountType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!['Student', 'School', 'Provider'].includes(accountType)) {
      return res.status(400).json({ message: 'Invalid account type' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const db = getDatabase();

    // Check if email already exists
    const existingUser = await db.get('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const userId = generateId();
    const now = new Date().toISOString();

    await db.run(
      `INSERT INTO users (id, name, email, password, accountType, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, name, email, hashedPassword, accountType, now, now]
    );

    // If student, create student profile
    if (accountType === 'Student') {
      const profileId = generateId();
      await db.run(
        `INSERT INTO studentProfiles (id, userId, createdAt, updatedAt)
         VALUES (?, ?, ?, ?)`,
        [profileId, userId, now, now]
      );
    }

    // Generate token
    const token = jwt.sign(
      { id: userId, email, accountType, name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: { id: userId, name, email, accountType }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const db = getDatabase();

    // Find user
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, accountType: user.accountType, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        accountType: user.accountType
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
}

export async function logout(req, res) {
  // JWT is stateless, so logout is handled on the client side
  res.json({ message: 'Logged out successfully' });
}

export async function getCurrentUser(req, res) {
  try {
    const db = getDatabase();
    const user = await db.get('SELECT id, name, email, accountType, profilePicture, bio FROM users WHERE id = ?', [req.user.id]);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
}
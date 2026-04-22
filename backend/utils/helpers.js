import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export function generateId() {
  return uuidv4();
}

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function generateToken(user, secret) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      accountType: user.accountType,
      name: user.name
    },
    secret,
    { expiresIn: '7d' }
  );
}
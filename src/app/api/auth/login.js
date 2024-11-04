// src/app/api/auth/login.js

import { compare } from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Simulated user data - replace this with a database lookup later
    const user = {
      username: 'testUser',
      passwordHash: '$2a$10$EIXIS.Yw5H6VzDmPfbf46uUVYF3S1r//z.eQkU/Bzo/UyYaQ1i7De' // bcrypt hash of 'password123'
    };

    // Check if user exists and password is correct
    if (user && await compare(password, user.passwordHash)) {
      // Successful login
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
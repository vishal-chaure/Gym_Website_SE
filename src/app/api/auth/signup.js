// src/app/api/auth/signup.js

import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Here, you would save `username` and `hashedPassword` to your database
    // For now, simulate a successful signup
    res.status(201).json({ message: 'User created successfully!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
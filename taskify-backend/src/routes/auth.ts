// routes/auth.js
import express from 'express';
import { signupUser, loginUser } from '../controllers/auth';

const router = express.Router();

// Register
router.post('/signup', signupUser);

// Login
router.post('/login', loginUser);

export default router;

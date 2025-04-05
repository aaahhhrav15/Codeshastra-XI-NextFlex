import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/UserModel.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { email , username, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email , username, password: hashedPassword });
        const token = crypto.randomBytes(32).toString('hex');
        user.tokens.push(token);
        await user.save();

        res.status(201).json({ message: 'User registered', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login and generate PAT
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = crypto.randomBytes(32).toString('hex');
        user.tokens.push(token);
        await user.save();

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Protected route
router.get('/profile', authenticate, async (req, res) => {
    res.json({ message: `Hello ${req.user.username}`, user: req.user });
});

// Logout (revoke token)
router.post('/logout', authenticate, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(t => t !== req.token);
        await req.user.save();
        res.json({ message: 'Logged out' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;

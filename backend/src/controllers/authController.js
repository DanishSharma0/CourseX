import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Helper function to generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET || 'secret',
        {
            expiresIn: '7d'
        }
    );
};

// @desc    Register a new user
// @route   POST /signup
// @access  Public
export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All information is required for signup!'
            });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: 'student'
        });

        const token = generateToken(newUser);

        res.status(201).json({
            success: true,
            message: 'New user created successfully',
            data: newUser,
            token
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// @desc    Authenticate user & get token
// @route   POST /login
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and Password both are required for Login'
            });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = generateToken(user);

        res.json({
            success: true,
            message: 'User logged in successfully',
            data: user,
            token
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// @desc    Get current user profile
// @route   GET /me
// @access  Private
export const getMe = async (req, res) => {
    try {
        res.json({
            success: true,
            data: req.user
        });
    } catch (err) {
        console.error('GetMe error:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

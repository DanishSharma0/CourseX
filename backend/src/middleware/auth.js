import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.headers.token) {
            token = req.headers.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. Authorization token missing.'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User no longer exists.'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error.message);
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token.'
        });
    }
};

export default protect;

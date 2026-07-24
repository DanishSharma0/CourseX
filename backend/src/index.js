import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';

const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Database connectivity check middleware
app.use((req, res, next) => {
    if (req.path === '/') return next();
    
    // 1 means connected
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({
            success: false,
            message: 'Database not connected. Please set your MongoDB Atlas connection URI (MONGO_URI) in backend/.env file.'
        });
    }
    next();
});

// Root API Health Check
app.get('/', (req, res) => {
    const dbState = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    res.json({ 
        message: 'Response from server - Project C API running',
        database: dbState
    });
});

// Routes
app.use('/', authRoutes);
app.use('/courses', courseRoutes);

// Start Server & Connect Database
app.listen(port, async () => {
    console.log(`🚀 Server is running on port ${port}`);
    await connectDB();
});
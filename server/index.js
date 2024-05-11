import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db/connect.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Hello from Backend 👋!');
});

app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}! 🎉`);
});
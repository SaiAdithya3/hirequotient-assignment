import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db/connect.js';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Hello from Backend 👋!');
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}! 🎉`);
});
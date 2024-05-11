import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB 🥳');
}).catch((err) => {
    console.log(err);
}
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}! 🎉`);
});
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/AuthRoutes.js';
import travelPlanRoutes from './routes/TravelPlanRoutes.js';
import placeRoutes from './routes/placeRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Sample route
app.get('/', (req, res) => {
    res.send('Hello from MERN backend!');
});


// User Operation
app.use('/api/auth', userRoutes);
app.use("/api/travelplans", travelPlanRoutes);
app.use("/api/map", placeRoutes);

// Start server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

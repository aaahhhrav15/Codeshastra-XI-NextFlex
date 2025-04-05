const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/AuthRoutes');
const travelPlanRoutes = require("./routes/TravelPlanRoutes");

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

// Start server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

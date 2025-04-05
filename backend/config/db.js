const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const MONGO_URI = 'mongodb://localhost:27017/your_db_name'; // replace as needed
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

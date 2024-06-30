// backend/index.js or app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Import routes
const bagsRoutes = require('./routes/bags');
const whatsappRoutes = require('./routes/whatsapp'); // Update this import

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());

// Use routes
app.use('/api/bags', bagsRoutes);
app.use('/api/whatsapp', whatsappRoutes); // WhatsApp API routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

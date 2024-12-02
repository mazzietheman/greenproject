const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 27017;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/project', { // Changed space to underscore
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema and model for join requests
const joinSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const JoinRequest = mongoose.model('JoinRequest', joinSchema);

// Route to handle join requests
app.post('/join', async (req, res) => {
    const { name, email, message } = req.body;
    const newJoinRequest = new JoinRequest({ name, email, message });

    try {
        await newJoinRequest.save();
        res.status(201).json({ message: 'Thank you for joining us!' }); // Changed to JSON response
    } catch (error) {
        res.status(400).json({ error: 'Error saving your request', details: error.message }); // More detailed error response
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Changed to http for clarity
});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/recycle_project", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

// Define a schema and model for join requests
const joinSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    message: String,
});

const JoinRequest = mongoose.model('JoinRequest', joinSchema);

// Route to handle join requests
app.post('/join', async (req, res) => {
    const { username, email, password, message } = req.body;

    // Validate input (add your validation logic here)
    if (!username || !email || !password || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Hash the password before saving (use bcrypt or similar)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newJoinRequest = new JoinRequest({
        username,
        email,
        password: hashedPassword,
        message,
    });

    try {
        await newJoinRequest.save();
        res.status(201).json({ message: 'Join request submitted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while saving your request.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


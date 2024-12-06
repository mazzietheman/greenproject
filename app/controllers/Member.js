const bcrypt = require('bcrypt');
const JoinModel = require('../model/member')

exports.join = async (req, res) => {

    const { username, email, password, message } = req.body;

    // Validate input (add your validation logic here)
    if (!username || !email || !password || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Hash the password before saving (use bcrypt or similar)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newJoinRequest = new JoinModel({
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
};
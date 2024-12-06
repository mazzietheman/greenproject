const bcrypt = require('bcrypt');
const JoinModel = require('../model/member')

exports.join = async (req, res) => {

    const { membername, email, password, message } = req.body;

    // Validate input (add your validation logic here)
    if (!membername || !email || !password || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Hash the password before saving (use bcrypt or similar)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newJoinRequest = new JoinModel({
        membername,
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



// Retrieve all member from the database.
exports.findAll = async (req, res) => {
    try {
        const rows = await JoinModel.find();
        res.status(200).json({ data:rows });
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single member with an id
exports.findOne = async (req, res) => {
    try {
        const row = await JoinModel.findById(req.params.id);
        res.status(200).json({data:row});
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a member by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await JoinModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Member not found.`
            });
        }else{
            res.send({ message: "Member updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a member with the specified id in the request
exports.destroy = async (req, res) => {

	const id = req.params.id;

    await JoinModel.findByIdAndDelete(id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Member not found.`
          });
        } else {
          res.send({
            message: "Member deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};

// Create and Save a new member
exports.create = async (req, res) => {

    const { username, email, password, message } = req.body;

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
        res.status(201).json({ message: 'data inserted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while saving your request.' });
    }
};
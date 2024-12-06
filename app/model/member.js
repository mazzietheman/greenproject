var mongoose = require('mongoose');

const joinSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    message: String,
});

const JoinRequest = mongoose.model('JoinRequest', joinSchema);

module.exports = JoinRequest;
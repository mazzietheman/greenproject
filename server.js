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

// MongoDB connection
main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect("mongodb://localhost:27017/recycle_project");
}

//Route http request
route = require('./app/routes/api')
app.use('/api',route)


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



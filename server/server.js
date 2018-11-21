const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Import API Routes
const testRoute = require('./routes/api/test'); //To be deleted after review
const polls = require('./routes/api/polls');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/systemic-consensys')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

//Test Index
app.get('/', (req, res) => res.send("Test"));

//Use Routes
app.use('/api/test', testRoute); //To be deleted after review
app.use('/api/polls', polls);

// Setting port for server
const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
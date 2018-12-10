const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


//Import API Routes
const testRoute = require('./routes/api/test'); //To be deleted after review
const polls = require('./routes/api/polls');
const options = require('./routes/api/options');

const app = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Configure mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/systemic-consensys')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

//Test Index
app.get('/', (req, res) => res.send("Test"));

//Merge Routes
polls.use('/:poll_id/options', options);

//Use Routes
app.use('/api/test', testRoute); //To be deleted after review
app.use('/api/polls', polls);

// Setting port for server
const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
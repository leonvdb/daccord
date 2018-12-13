import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';


//Import API Routes
import testRoute from './routes/api/test' //To be deleted after review
import polls from './routes/api/polls'
import options from './routes/api/options'

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
    .catch((err: Error) => console.log(err));

//Test Index
app.get('/', (req: express.Request, res: express.Response) => res.send("Test"));

//Merge Routes
polls.use('/:poll_id/options', options);

//Use Routes
app.use('/api/test', testRoute); //To be deleted after review
app.use('/api/polls', polls);

// Setting port for server
const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
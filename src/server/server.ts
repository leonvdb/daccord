import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import logger from 'morgan';
import configPassport from './config/passport';
//Import graphQL Schema
import server from './schema'
import { ApiError } from './utilities/ApiError';
import { ApiResponse } from './utilities/ApiResponse';

const app = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(cors());

    app.use(logger('dev'));
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

//Passport middleware
app.use(passport.initialize());
configPassport(passport);
app.use('/graphql', (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (user) req.user = user
        next()
    })(req, res, next)
})

//Test Index
app.get('/', (req: express.Request, res: express.Response) => res.send("Test"));

//graphql 
server.applyMiddleware({ app, path: '/graphql' })

app.use((err: ApiError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.message); // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'

    res.status(err.statusCode).json(new ApiResponse(err.message)); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

// Setting port for server
const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
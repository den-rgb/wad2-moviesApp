import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import moviesRouter from './api/movies';
import genresRouter from './api/genres';
import codeRouter from './api/TwoFactor';
import session from 'express-session';
import authenticate from './authenticate';
import './db';
import './seedData';
import usersRouter from './api/users';
import passport from './authenticate';


dotenv.config();

const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();

const port = process.env.PORT;

morgan.token('body',(req)=>JSON.stringify(req.body));



app.use(passport.initialize());
app.use(cookieParser());
app.use(morgan(':url :method :body'));
app.use(helmet());
app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));



app.use(express.json());


app.use('/api/genres', genresRouter);
app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/code',codeRouter);
//app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);
app.use(errHandler);




app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
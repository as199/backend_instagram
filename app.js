const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const publicationsRouter = require('./routes/publications');

const app = express();
app.use(cors({
    origin: '*',
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.user('/api/v1', authRouter);
app.use('/api/v1', usersRouter);
app.use('/api/v1', publicationsRouter);

module.exports = app;

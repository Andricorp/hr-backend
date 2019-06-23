const createError = require('http-errors');
const express = require('express');
const path = require('path');
const { secretKey } = require('./keys');
const asyncHandler = require('express-async-handler');
const expressJWT = require('express-jwt');
const { greating, user, auth } = require('./routes/index');
const bodyParser = require('body-parser');

const { createPool } = require('./bussiness-logic/db');
createPool();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const jwt = expressJWT({
    secret: secretKey,
    algorithms: ['HS512'],
    credentialsRequired: true
});
app.use('/', greating);
//app.use('/api/user', asyncHandler(user));
app.use('/api/user', jwt, user);

app.use('/api/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(error, req, res, next) {
    console.log(error);
    res.status(error.status || 500).json({
        error: { message: error.message },
        status: false
    });
});

//{ error: { message: error.message }
module.exports = app;

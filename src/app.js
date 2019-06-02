const createError = require('http-errors');
const express = require('express');
const path = require('path');
const asyncHandler = require('express-async-handler');
const { greating, user } = require('./routes/index');
const bodyParser = require('body-parser');

const { createPool } = require('./bussiness-logic/db');
createPool();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/', greating);
//app.use('/api/user', asyncHandler(user));
app.use('/api/user', user);

// catch 404 and forward to error handler
/* app.use(function(req, res, next) {
    next(createError(404));
});
 */
module.exports = app;

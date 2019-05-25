const createError = require('http-errors');
const express = require('express');
const path = require('path');

const { greating } = require('./routes/index');

const app = express();

app.use('/', greating);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

module.exports = app;

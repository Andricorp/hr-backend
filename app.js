var createError = require('http-errors');
var express = require('express');
var path = require('path');

var { greating } = require('./src/routes/index');

var app = express();

app.use('/', greating);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

module.exports = app;

const Joi = require('@hapi/joi');
//const httpErrors = require('http-errors');

module.exports = (data, scheema) => {
    return Joi.validate(data, scheema);
};

const Joi = require('@hapi/joi');
//const httpErrors = require('http-errors');

module.exports = (data, scheema) => {
    console.log('executing validation');

    return Joi.validate(data, scheema);
};

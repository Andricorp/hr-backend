//talidating fields
//const Joi = require('@hapi/joi');
const httpErrors = require('http-errors');

const UserFieldsValidate = require('./user-fields-validate');
const validation = require('../../helpers/validate');

module.exports = userId => {
    console.log(UserFieldsValidate.findUser(), '>>>>>>>>>>>>>>>>>>>>>>>>>');
    try {
        const { error } = validation({ userId }, UserFieldsValidate.findUser());
        if (error) {
            throw error;
        }
    } catch (error) {
        throw new httpErrors.BadRequest(error.message);
    }
    console.log('user stored');

    //getting user from DBS

    return { user: 'name 2', address: '23ewqarshsjd', userId };
};

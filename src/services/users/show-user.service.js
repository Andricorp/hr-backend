//talidating fields
//const Joi = require('@hapi/joi');
const httpErrors = require('http-errors');

const UserFieldsValidate = require('./user-fields-validate');
const validation = require('../../helpers/validate');

module.exports = async userId => {
    try {
        const { error } = validation({ id: userId }, UserFieldsValidate.findUser());
        if (error) {
            throw error;
        }
    } catch (error) {
        throw new httpErrors.BadRequest(error.message);
    }
    console.log('user stored');

    //getting user from DBS
    let currentUser;
    try {
        const pool = await global.pool;
        currentUser = await pool.query(`SELECT user_name, user_id, user_email, role_id  FROM user WHERE user_id=${userId}`);
    } catch (error) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', error);
        throw error;
    }

    return currentUser;
};

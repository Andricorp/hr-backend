//talidating fields
//const Joi = require('@hapi/joi');
const httpErrors = require('http-errors');
require('console.json');
const UserFieldsValidate = require('./user-fields-validate');
const validation = require('../../helpers/validate');
const { roles } = require('../../config');
const checkRole = require('../../helpers/checkRole');

module.exports = async user => {
    try {
        const { error } = validation(user, UserFieldsValidate.deleteUser());
        await checkRole(user.deletedBy, user.role);
        console.log('deleting user is allowed');

        if (error) {
            throw error;
        }
    } catch (error) {
        throw new httpErrors.BadRequest(error.message);
    }

    try {
        console.log(` pool - ${await Object.keys(pool)}`);
        const query = `SELECT user_name, user_id, user_email, role_id  FROM user WHERE user_id=${user.userId}`;
        console.log(query);
        const currentUser = await pool.query(query); //[{ user_id }]

        console.json(currentUser);
        if (currentUser.length && Object.keys(currentUser[0]).includes('user_id')) {
            console.log('deleted');
            // await pool.query(`DELETE FROM user WHERE user_id='${user.userId}'`);
        } else {
            throw new Error(`user with id ${user.userId} does not exist`);
        }
    } catch (error) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', error);
        throw error;
    }

    //creating user in DBS

    return { message: `user ${user.userId} was deleted` };
};

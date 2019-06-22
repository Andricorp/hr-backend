//talidating fields
//const Joi = require('@hapi/joi');
const httpErrors = require('http-errors');
const UserFieldsValidate = require('./user-fields-validate');
const validation = require('../../helpers/validate');
const { roles } = require('../../config');
const checkRole = require('../../helpers/checkRole');

module.exports = async user => {
    try {
        const { error } = validation(user, UserFieldsValidate.createUser());
        await checkRole(user.creatorId, user.role);
        console.log('creating uer is allowed');
        if (error) {
            throw error;
        }
    } catch (error) {
        throw new httpErrors.BadRequest(error.message);
    }

    let newUser = {};
    user.password =
        Math.random()
            .toString(36)
            .substring(2, 15) +
        Math.random()
            .toString(36)
            .substring(2, 15);
    console.log(`password - ${newUser.password}`);

    //creating user in DBS
    try {
        const pool = await global.pool;
        newUser = await pool.query(`INSERT INTO user(user_name, user_email, user_password, role_id ) VALUES ('${user.name}', '${user.email}', '${user.password}',   ${roles[user.role]});`);
    } catch (error) {
        console.log('DB error', error);
        throw error;
    }

    console.log('user created');

    return user;
};

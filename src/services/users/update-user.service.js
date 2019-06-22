//talidating fields
//const Joi = require('@hapi/joi');
const httpErrors = require('http-errors');

const UserFieldsValidate = require('./user-fields-validate');
const validation = require('../../helpers/validate');
const { roles } = require('../../config');
const checkRole = require('../../helpers/checkRole');

module.exports = async user => {
    try {
        const { error } = validation(user, UserFieldsValidate.updateUser());
        await checkRole(user.updatedBy, user.role);
        console.log('updating user is allowed');
        if (error) {
            throw error;
        }
    } catch (error) {
        throw new httpErrors.BadRequest(error.message);
    }
    console.log('user updated');

    //creating user in DBS
    let updatedtUser;
    try {
        const query = `SELECT user_name, user_id, user_email, role_id  FROM user WHERE user_id=${user.userId}`;
        console.log(query);
        const currentUser = await pool.query(query);
        console.json(currentUser);

        // console.json(currentUser);
        if (currentUser.length && Object.keys(currentUser[0]).includes('user_id')) {
            console.log('updated');
            updatedtUser = await pool.query(`UPDATE user
            SET
                user_name = '${user.name}',
                user_email = '${user.email}',
                role_id= ${roles[user.role]}
            WHERE user_id = ${user.userId};`);
        } else {
            throw new Error(`user with id ${user.userId} does not exist`);
        }
    } catch (error) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', error);
        throw error;
    }

    return updatedtUser;
};

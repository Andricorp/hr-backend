//talidating fields
//const Joi = require('@hapi/joi');
const httpErrors = require('http-errors');

const UserFieldsValidate = require('./user-fields-validate');
const validation = require('../../helpers/validate');

const checkRole = async (updatedBy, userRole = '1') => {
    try {
        const { error } = validation({ userId: updatedBy }, UserFieldsValidate.findUser());
        if (error) {
            throw error;
        }
    } catch (error) {
        throw new httpErrors.BadRequest(error.message);
    }
    //query to DB

    const roles = {
        guest: 1,
        hr: 2,
        admin: 3,
        moderator: 4
    };
    //userRole = 'admin';
    roleOfUpdater = 'moderator'; //getRoleById creatorId todo

    console.log(userRole, roleOfUpdater, '>>>>>>>>>>>>>>>.');

    if (!roles[userRole] || !roles[roleOfUpdater]) {
        throw new httpErrors.InternalServerError(`role is invalid`);
    }
    if (roles[roleOfUpdater] < 3 || roles[roleOfUpdater] <= roles[userRole]) {
        throw new httpErrors.Forbidden('You have no permission for this query');
    }
    return true;
};

module.exports = async user => {
    try {
        await checkRole(user.updatedBy, user.role);
        console.log('updating user is allowed');
    } catch (error) {
        throw error;
    }

    try {
        const { error } = validation(user, UserFieldsValidate.updateUser());
        if (error) {
            throw error;
        }
    } catch (error) {
        throw new httpErrors.BadRequest(error.message);
    }
    console.log('user updated');

    //creating user in DBS

    return user;
};

//talidating fields
//const Joi = require('@hapi/joi');
const httpErrors = require('http-errors');

const UserFieldsValidate = require('./user-fields-validate');
const validation = require('../../helpers/validate');

const checkRole = async (deletedBy, userRole = '1') => {
    //query to DB
    console.log('executing check');

    const roles = {
        guest: 1,
        hr: 2,
        admin: 3,
        moderator: 4
    };
    //userRole = 'admin';
    roleOfdeleter = 'moderator'; //getRoleById creatorId todo

    console.log(userRole, roleOfdeleter, '>>>>>>>>>>>>>>>.');

    if (!roles[userRole] || !roles[roleOfdeleter]) {
        throw new httpErrors.InternalServerError(`role is invalid`);
    }
    if (roles[roleOfdeleter] < 3 || roles[roleOfdeleter] <= roles[userRole]) {
        throw new httpErrors.Forbidden('You have no permission for this query');
    }
    return true;
};

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
    console.log('user was deleted');

    //creating user in DBS

    return user;
};

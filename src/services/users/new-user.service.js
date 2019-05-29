//talidating fields
//const Joi = require('@hapi/joi');
const httpErrors = require('http-errors');

const UserFieldsValidate = require('./user-fields-validate');
const validation = require('../../helpers/validate');

const checkRole = async (creatorId, userRole = '1') => {
    try {
        const { error } = validation({ userId: creatorId }, UserFieldsValidate.findUser());
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
    creatorRole = 'moderator'; //getRoleById creatorId todo

    console.log(userRole, creatorRole, '>>>>>>>>>>>>>>>.');

    if (!roles[userRole] || !roles[creatorRole]) {
        throw new httpErrors.InternalServerError(`user or creator role is invalid`);
    }
    if (roles[creatorRole] < 3 || roles[creatorRole] <= roles[userRole]) {
        throw new httpErrors.Forbidden('You have no permission for this query');
    }
    return true;
};

module.exports = async user => {
    try {
        await checkRole(user.creatorId, user.role);
        console.log('creating uer is allowed');
    } catch (error) {
        throw error;
    }

    try {
        const { error } = validation(user, UserFieldsValidate.createUser());
        if (error) {
            throw error;
        }
    } catch (error) {
        throw new httpErrors.BadRequest(error.message);
    }
    console.log('user created');

    //creating user in DBS

    return user;
};

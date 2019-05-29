'use strict';
const Joi = require('@hapi/joi');

class UserFieldsValidate {
    static findUser() {
        return {
            id: Joi.number().required()
        };
    }
    static createUser() {
        return {
            userId: Joi.number().required(),
            creatorId: Joi.number().required(),
            name: Joi.string(),
            email: Joi.string()
                .email()
                .required(),
            role: Joi.string()
                .lowercase()
                .required()
        };
    }
    static updateUser() {
        return {
            userId: Joi.number().required(),
            updatedBy: Joi.number().required(),
            name: Joi.string(),
            email: Joi.string()
                .email()
                .required(),
            role: Joi.string()
                .lowercase()
                .required()
        };
    }
    static deleteUser() {
        return {
            userId: Joi.number().required(),
            deletedBy: Joi.number().required(),
            role: Joi.string()
                .lowercase()
                .required()
        };
    }
}

module.exports = UserFieldsValidate;

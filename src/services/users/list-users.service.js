//talidating fields
const Joi = require('@hapi/joi');
const httpErrors = require('http-errors');

const fieldValidation = ({ username, password, email }) => {
    const userListSachema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string(),
        email: Joi.string()
            .email()
            .required()
    });
    /* 
        .with('username')
        .without('password', 'access_token'); */

    return Joi.validate({ username, password }, userListSachema);
};

module.exports = user => {
    try {
        //fieldValidation(user);
        fieldValidation({ username: 'ivan', password: 'sDFASFSGADFC' });
    } catch (error) {
        throw new httpErrors.BadRequest(error.message);
    }
    console.log('user stored');
    return [{ user: 'name i', address: '23ewqar' }, { user: 'name 2', address: '23ewqarshsjd' }, { user: 'name 3', address: '23ewqar' }];
};

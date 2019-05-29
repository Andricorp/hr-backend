//talidating fields
const httpErrors = require('http-errors');
const UserFieldsValidate = require('./user-fields-validate');
const validation = require('../../helpers/validate');

module.exports = () => {
    console.log('user stored');
    return [{ user: 'name i', address: '23ewqar' }, { user: 'name 2', address: '23ewqarshsjd' }, { user: 'name 3', address: '23ewqar' }];
};

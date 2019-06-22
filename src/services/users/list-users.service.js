//talidating fields
const httpErrors = require('http-errors');
const UserFieldsValidate = require('./user-fields-validate');
const validation = require('../../helpers/validate');

module.exports = async () => {
    let allUsers;
    try {
        const pool = await global.pool;
        allUsers = await pool.query(`SELECT user_name, user_id  FROM user`);
        allUsers.map(user => {
            for (let key in user) {
                console.log(`${key}: ${user[key]}`);
            }
        });
    } catch (error) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', error);
        throw error;
    }
    console.log('user listed');
    return allUsers;
};

const { roles } = require('../config');
const httpErrors = require('http-errors');

module.exports = async (initiatedBy, userRole = '1') => {
    //query to DB
    console.log('executing check');

    let roleOfInitiator;
    try {
        const [{ role }] = await pool.query(`SELECT role_name as role FROM user JOIN role ON user.role_id = role.role_id WHERE user_id='${initiatedBy}'`);
        roleOfInitiator = role;
    } catch (error) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', error);
        throw error;
    }
    //userRole = 'admin';
    // roleOfInitiator = 'moderator'; //getRoleById creatorId todo

    console.log(userRole, roleOfInitiator, '>>>>>>>>>>>>>>>.');

    if (!roles[userRole] || !roles[roleOfInitiator]) {
        throw new httpErrors.InternalServerError(`role is invalid`);
    }
    if (roles[roleOfInitiator] < 3 || roles[roleOfInitiator] <= roles[userRole]) {
        throw new httpErrors.Forbidden('You have no permission for this query');
    }
    return true;
};

const getAllUsers = require('../../services/users/list-users.service');
const getUserById = require('../../services/users/show-user.service');
const createUser = require('../../services/users/new-user.service');
const updateUser = require('../../services/users/update-user.service');

//1 - check if creator have permissions to create this user
//2 -

module.exports = { getAllUsers, getUserById, createUser, updateUser };
/* 

try {
  const { error } = validate(user.email, UserValidate.findUserByEmail());
  if (error) {
    throw error;
}
} catch (error) {
throw new httpErrors.BadRequest(error.message);
} */

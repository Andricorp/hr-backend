const getAllUsers = require('../../services/users/list-users.service');
const getUserById = require('../../services/users/show-user.service');
const createUser = require('../../services/users/new-user.service');
const updateUser = require('../../services/users/update-user.service');
const deleteUser = require('../../services/users/delete-user.service');

//1 - check if creator have permissions to create this user
//2 -

module.exports = {
    getAllUsers: async (req, res) => res.json(await getAllUsers({ query: req.query, body: req.body, params: req.params })),
    getUserById: async (req, res) => {
        const id = req.params.id;
        res.json(await getUserById(id));
    },
    createUser: async (req, res) => {
        const userData = req.body;
        res.json(await createUser(userData));
    },
    updateUser: async (req, res) => {
        const userData = req.body;
        userData.userId = req.params.id;
        res.json(await updateUser(userData));
    },
    deleteUser: async (req, res) => {
        const userData = req.body;
        userData.userId = req.params.id;
        console.log(userData);
        res.json(await deleteUser(userData));
    }
};

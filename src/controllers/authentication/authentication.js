const { signin, signup, refresh } = require('../../services/auth/authentication.service');

//1 - check if creator have permissions to create this user
//2 -

module.exports = {
    signin: async (req, res) => {
        const userData = req.body;
        userData.userId = req.params.id;
        res.json(await signin(userData));
    },
    signup: async (req, res) => {
        const userData = req.body;
        userData.userId = req.params.id;
        res.json(await signup(userData));
    },
    refresh: async (req, res) => {
        const userData = req.body;
        userData.userId = req.params.id;
        res.json(await refresh(userData));
    }
};

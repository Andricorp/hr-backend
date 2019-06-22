const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user/user.controler');

const handleError = fn => {
    return (req, res, next) => {
        fn(req, res).catch(next);
    };
};

router.get('/', handleError(getAllUsers));
router.get('/:id', handleError(getUserById));
router.post('/', handleError(createUser));
router.put('/:id', handleError(updateUser));
router.delete('/:id', handleError(deleteUser));

module.exports = router;

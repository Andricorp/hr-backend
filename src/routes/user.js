const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/user/user.controler');
const httpError = require('../helpers/error');

const handleError = fn => {
    return (req, res, next) => {
        fn(req, res).catch(next);
    };
};

/* GET home page. */
router.get('/', async (req, res, next) => {
    const id = req.params.user;
    console.log(`User with id ${id} is requested list`);
    try {
        const list = await getAllUsers();
        throw new Error('my custom error..');
        res.send(list);
    } catch (error) {
        res.status(httpError(error) || 500).json({ error: { message: error.message } });
    }
});

/* TODO
router.get('/', handleError(getAllUsers));
*/

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    console.log(`User with id ${id} is requested list`);
    try {
        const user = await getUserById(id);
        res.send(user);
    } catch (error) {
        res.status(httpError(error) || 500).json({ error: { message: error.message } });
    }
});

router.post('/', async (req, res, next) => {
    const userData = req.body;
    console.log(userData);

    try {
        const user = await createUser(userData);
        res.send(user);
    } catch (error) {
        res.status(httpError(error) || 500).json({ error: { message: error.message } });
    }
});

router.put('/', async (req, res, next) => {
    const userData = req.body;
    console.log(userData);

    try {
        const user = await updateUser(userData);
        res.send(user);
    } catch (error) {
        res.status(httpError(error) || 500).json({ error: { message: error.message } });
    }
});

router.delete('/', async (req, res, next) => {
    const userData = req.body;
    console.log(userData);

    try {
        const user = await deleteUser(userData);
        res.send(user);
    } catch (error) {
        res.status(httpError(error) || 500).json({ error: { message: error.message } });
    }
});

/* router.use(function(error, req, res, next) {
    // Gets called because of `wrapAsync()`
    console.log(error, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    res.json({ message: error.message });
});

function wrapAsync(fn) {
    return function(req, res, next) {
        // Make sure to `.catch()` any errors and pass them along to the `next()`
        // middleware in the chain, in this case the error handler.
        fn(req, res, next).catch(next);
    }; 
}*/

module.exports = router;

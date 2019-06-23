const express = require('express');
const router = express.Router();
const { signin, signup, refresh } = require('../controllers/authentication/authentication');

const handleError = fn => {
    return (req, res, next) => {
        fn(req, res).catch(next);
    };
};

router.post('/signup', handleError(signup));
router.post('/signin', handleError(signin));
router.post('/refresh', handleError(refresh));

module.exports = router;

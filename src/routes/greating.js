const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    const greating = 'Hi on HR-tools! Working on MVC architecture now';
    res.send(greating);
});

module.exports = router;

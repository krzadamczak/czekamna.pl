const express = require('express');
const path = require('path');
const router = express.Router();
const countdownController = require(path.join('..', 'controllers', 'countdownController'));

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/:id', countdownController.getCountdown, (req, res) => {
    console.log('xxx', res.locals.countdown);
    res.render('countdown', { countdown: res.locals.countdown });
});

router.post('/', countdownController.saveCountdown, (req, res) => {
    res.json({status: 201});
});

module.exports = router;
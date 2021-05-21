const express = require('express');
const path = require('path');
const router = express.Router();
const countdownController = require(path.join('..', 'controllers', 'countdownController'));

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/:id', countdownController.getCountdown, (req, res) => {
    res.render('countdown', { countdown: res.locals.countdown });
});

router.post('/', countdownController.saveCountdown, (req, res) => {
    console.log(`/${req.body.url}`);
    res.json({status: 201});
    // res.redirect(`/${req.body.url}`);
});

module.exports = router;
const path = require('path');
const Countdown = require(path.join('..', 'models', 'countdownModel'));

function saveCountdown(req, res, next){
    const countdown = new Countdown(req.body);
    res.locals.url = req.body.url;
    countdown.save();
    next();
}

module.exports = {
    saveCountdown
}
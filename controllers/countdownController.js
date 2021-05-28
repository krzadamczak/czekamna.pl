const path = require('path');
const Countdown = require(path.join('..', 'models', 'countdownModel'));

function saveCountdown(req, res, next){
    const countdown = new Countdown(req.body);
    countdown.save();
    next();
}

function getCountdown(req, res, next){
    Countdown.findOne({url: req.params.id}, (err, doc) => {
        res.locals.countdown = doc;
        next();
    });
}

module.exports = {
    saveCountdown,
    getCountdown
}
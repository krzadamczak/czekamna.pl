const path = require('path');
const Countdown = require(path.join('..', 'models', 'countdownModel'));

function saveCountdown(req, res, next){
    const countdown = new Countdown(req.body);
    countdown.save();
    next();
}

function getCountdown(req, res, next){
    Countdown.findOne({urlID: req.params.id}, (err, doc) => {
        res.locals.countdown = Object.assign(doc, { fullUrl: req.headers.host + req.baseUrl });
        console.log('res.locals.countdown', res.locals.countdown);
        next();
    });
}

module.exports = {
    saveCountdown,
    getCountdown
}
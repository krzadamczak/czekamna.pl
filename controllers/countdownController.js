const path = require('path');
const Countdown = require(path.join('..', 'models', 'countdownModel'));

function saveCountdown(req, res, next){
    const countdown = new Countdown(req.body);
    res.locals.url = req.body.url;
    countdown.save();
    next();
}

function getCountdown(req, res, next){
    console.log('req.params.id', req.params.id);
    Countdown.findOne({url: req.params.id}, (err, doc) => {
        console.log(doc);
        res.locals.countdown = doc;
        next();
    });
}

module.exports = {
    saveCountdown,
    getCountdown
}
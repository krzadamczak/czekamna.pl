const mongoose = require('mongoose');
const countdownSchema = new mongoose.Schema({
    date: String,
    name: String,
    url: String,
});

module.exports = mongoose.model('countdown', countdownSchema);
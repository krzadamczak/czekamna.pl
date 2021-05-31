const mongoose = require('mongoose');
const countdownSchema = new mongoose.Schema({
    date: String,
    name: String,
    urlID: String,
});

module.exports = mongoose.model('countdown', countdownSchema);
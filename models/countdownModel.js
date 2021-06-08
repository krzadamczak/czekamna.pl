const mongoose = require('mongoose');
const countdownSchema = new mongoose.Schema({
    endDate: String,
    startDate: String,
    name: String,
    urlID: String
});

module.exports = mongoose.model('countdown', countdownSchema);
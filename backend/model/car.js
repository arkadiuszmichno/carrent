const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    mark: String,
    model: String,
    productionYear: Number,
    power: Number,
    seats: Number,
    segment: String,
    gearbox: String,
    price: Number,
    img: Object
});

module.exports = mongoose.model('Car', CarSchema);
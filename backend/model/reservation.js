const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    carId: {
        type: String,
        required: true
    },
    dateFrom: {
        type: Date,
        required: true
    },
    dateTo: {
        type: Date,
        required: true
    },
    dayPrice: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    pickupCity: {
        type: String,
        required: true
    },
    returnCity: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('reservation', ReservationSchema);
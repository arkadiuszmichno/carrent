const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    car: {
        _id: {
            type: String,
            required: true
        },
        mark: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        img: {
            type: Object,
            required: true
        }
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
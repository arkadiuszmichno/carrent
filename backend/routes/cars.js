const express = require('express');
const router = express.Router();
var Car = require("../model/car");
var Reservation = require("../model/reservation");
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');

router.get('/', passport.authenticate('jwt', {session: false}), function (req, res) {
    let token = getToken(req.headers);
    if (token) {
        let query = {};
        if (req.query.gearbox) {
            query.gearbox = req.query.gearbox;
        }
        if (req.query.seats) {
            query.seats = req.query.seats;
        }
        if (req.query.segment) {
            query.segment = req.query.segment;
        }
        Car.find(query, function (err, cars) {
            if (err) return err;
            Reservation.find({dateTo: {$gte: req.query.dateFrom}, dateFrom: {$lte: req.query.dateTo}}, function (err, reservations) {
              //  console.log(reservations);
                let usedCars = [];
                for(let i = 0; i < cars.length; i++) {
                    console.log("Car: " + cars[i]._id);
                    for(let j = 0; j < reservations.length; j++) {
                        // console.log("reservation: " + reservations[j].carId);
                        if (reservations[j].car._id.toString() === cars[i]._id.toString()) {
                            console.log("wtf");
                            usedCars.push(cars[i]._id);
                        }
                    }
                }
                console.log(usedCars);
                let freeCars = cars.filter(car => !usedCars.includes(car._id));
                console.log(freeCars);
                res.json(freeCars);
            });
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        let parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;
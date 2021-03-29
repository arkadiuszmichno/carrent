const express = require('express');
const router = express.Router();
var Reservation = require("../model/reservation");
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');

router.post('/', passport.authenticate('jwt', {session: false}), function (req, res) {
    let token = getToken(req.headers);
    if (token) {
        let Difference_In_Time = new Date(req.body.dateTo).getTime() - new Date(req.body.dateFrom).getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        let newReservation = new Reservation({
            userId: req.body.userId,
            carId: req.body.carId,
            dateFrom: new Date(req.body.dateFrom),
            dateTo: new Date(req.body.dateTo),
            dayPrice: req.body.dayPrice,
            totalPrice: Difference_In_Days * req.body.dayPrice,
            pickupCity: req.body.pickupCity,
            returnCity: req.body.returnCity,
            status: 'NEW'
        });

        newReservation.save(function (err) {
            if (err) {
                return res.json({success: false, msg: 'Save reservation failed.'});
            }
            res.json({success: true, msg: 'Successful created new reservation.'});
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.get('/', passport.authenticate('jwt', {session: false}), function (req, res) {
    let token = getToken(req.headers);
    if (token) {
        let query = {};
        if (req.query.userId) {
            query.userId = req.query.userId;
        }
        if (req.query.status) {
            query.status = req.query.status;
        }
        Reservation.find(query, function (err, reservations) {
            if (err) return next(err);
            res.json(reservations);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.patch('/:reservationId', passport.authenticate('jwt', {session: false}), function (req, res) {
    let token = getToken(req.headers);
    if (token) {
        let Difference_In_Time = new Date(req.body.dateTo).getTime() - new Date(req.body.dateFrom).getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        let query = {
            dateFrom: req.body.dateFrom,
            dateTo: req.body.dateTo,
            pickupCity: req.body.pickupCity,
            returnCity: req.body.returnCity,
            totalPrice : Difference_In_Days * req.body.dayPrice,
        };
        Reservation.updateOne({_id: req.params.reservationId}, {$set: query}, function (err, reservations) {
            if (err) {
                res.status(500).send({success: false, msg: err.message});
            }
            res.status(200).send({success: true, reservation: reservations});
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.patch('/:reservationId/status', passport.authenticate('jwt', {session: false}), function (req, res) {
    let token = getToken(req.headers);
    if (token) {
        Reservation.updateOne({_id: req.params.reservationId}, {$set: {status: "CONFIRMED"}}, function (err, reservations) {
            if (err) return next(err);
            res.status(200).send({success: true, reservation: reservations});
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.delete('/:reservationId', passport.authenticate('jwt', {session: false}), function (req, res) {
    let token = getToken(req.headers);
    if (token) {
        Reservation.deleteOne({_id: req.params.reservationId}, function (err, reservations) {
            if (err) return next(err);
            res.status(204).send({success: true, msg: "Reservation removed"});
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
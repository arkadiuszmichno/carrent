var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../model/user");
const cors = require('cors');


router.post('/signup', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
      //  User.findOne({username:})
        let newUser = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            name: req.body.name,
            admin: false
        });

        newUser.save(function (err) {
            if (err) {
                console.log(err.code);
                console.log(err.name);
                console.log(err.message);
                if (err.code === 11000) {
                    return res.json({success: false, errors: [{path: err.keyValue, message: 'Already exists'}]})
                }
                let errorResponse = {
                    success: false,
                    errors: err.errors
                };
                return res.json(errorResponse);
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});

router.post('/signin', cors(), function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    console.log(user);
                    console.log(config.secret);
                    var token = jwt.sign(JSON.stringify(user), config.secret);
                    // return the information including token as JSON
                    res.json({success: true, user: user, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
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
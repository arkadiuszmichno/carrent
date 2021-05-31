const express = require('express');
const fs = require('fs');
var app = express();
var router = express.Router();
var Img = require("../model/imgModel");
const cors = require('cors');
var Car = require("../model/car");

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    }
});
const upload = multer({storage: storage});

router.route('/img_data')
    .post(upload.single('file'), cors(), function (req, res) {
        let new_img = new Img({
            img: {
                data: fs.readFileSync(req.file.path),
                contentType: 'image/jpeg'
            }
        });
        let cars = Car.findOne({_id: "60b12581234f822d3d978be8"}, function (err, car) {
            let newCar = car;
            newCar.img = {
                data: fs.readFileSync(req.file.path),
                contentType: 'image/jpeg'
            }
            console.log(newCar);
            newCar.save();
        });
        // new_img.save();
        res.json({message: 'New image added to the db!'});
    }).get(function (req, res) {
    Img.findOne({}, 'img createdAt', function (err, img) {
        if (err)
            res.send(err);
        res.contentType('json');
        res.send(img);
    }).sort({createdAt: 'desc'});
});

module.exports = router;

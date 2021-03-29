const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const config = require('./config/database');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const carsRoutes = require('./routes/cars');
const reservationRoutes = require('./routes/reservations');

const app = express();

mongoose.connect(config.database, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, () =>{
    console.log("connected");
});

app.use(cors());
app.use(passport.initialize());

app.get('/', function(req, res) {
    res.send('Page under construction.');
});
// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/api', jsonParser, api);
app.use('/api/cars', carsRoutes);
app.use('/api/reservations', reservationRoutes);

module.exports = app;

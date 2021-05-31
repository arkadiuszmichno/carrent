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
const uploadRoutes = require('./routes/uploads');

const app = express();

const server = app.listen(8080, () => {
    console.log('Server is started on 127.0.0.1:'+ 8080)
})

mongoose.connect(config.database, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (respo) =>{
    console.log("connected");
    console.log(respo);
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
app.use('/api/uploads', uploadRoutes);

module.exports = app;
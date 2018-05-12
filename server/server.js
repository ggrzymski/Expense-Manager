const express = require('express');
let mongoose = require('mongoose');
let routes = require('./routes/routes');

let mongoDB = 'mongodb://wildemu:kratos@ds241699.mlab.com:41699/expenses';
mongoose.connect(mongoDB);

let app = express();
const port = process.env.PORT || 5000;
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
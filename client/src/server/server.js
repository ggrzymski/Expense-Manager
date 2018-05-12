let express = require('express');
let router = require('./routes/routes.js');
let path = require('path');

let app = express();
app.set('views', path.join(__dirname, '../components'));
app.use(express.static(path.join(__dirname, '../components')));
app.use('/', router);

module.exports=app;
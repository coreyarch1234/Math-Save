require('babel-register');
require('babel-polyfill');

import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
//setting up db
import mongodb from 'mongodb';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Use bluebird
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mathsave', {
  useMongoClient: true,
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    app.listen(process.env.PORT || port, function() {
        console.log('successful connection');
        console.log('env port' + port);
    })
})

/**
 * Created by alexboor on 7/9/2017.
 */
'use strict';

let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/poll-oss',{ useMongoClient: true });

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('DB connected');
});
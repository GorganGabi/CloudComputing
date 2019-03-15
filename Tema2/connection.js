const mongoose = require('mongoose')
const config   = require('./config');


mongoose
    .connect(config.database, {
        useNewUrlParser: true,
        autoIndex: false
    })
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.log(`Error while connecting to db ${err}`);
    });

exports.mongoose = mongoose;
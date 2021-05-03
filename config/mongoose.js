const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('err', console.error.bind(console, 'error in connecting to database'));

db.once('open', function () {
    console.log('connected with database :: MongoDB');
});

module.exports = db;
const mongoose = require('mongoose');
const env = require('./environment.js');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('err', console.error.bind(console, 'error in connecting to database'));

db.once('open', function () {
    console.log('connected with database :: MongoDB');
});

module.exports = db;
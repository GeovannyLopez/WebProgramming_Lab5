//Set up mongoose connection
let mongoose = require('mongoose');
var config = require('config');
var dbConfig = config.get('Customer.dbConfig');


mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });

module.exports = mongoose;
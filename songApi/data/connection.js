//Set up mongoose connection
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/crud', { useNewUrlParser: true });

module.exports = mongoose;
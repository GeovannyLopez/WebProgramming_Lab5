//Set up mongoose connection
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/web', { useNewUrlParser: true });

module.exports = mongoose;
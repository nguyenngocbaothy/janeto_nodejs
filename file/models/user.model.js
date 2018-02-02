var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        required: true
    },
    password: String,
    profession: String
});

var user = mongoose.model('user', userSchema);

module.exports = user;
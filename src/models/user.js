// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    name: String,
    email: String,
    verified: Boolean,
    remember: Boolean,

    l_password: String,
    l_token: String,

    f_id: String,
    f_token: String
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.l_password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
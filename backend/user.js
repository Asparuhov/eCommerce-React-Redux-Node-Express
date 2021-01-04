const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: String,
    password: String,
    balance: Number
})

const User = mongoose.model('user', UserSchema );

exports.User = User;
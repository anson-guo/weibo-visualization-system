const mongoose = require('mongoose');

const db = require('../config/db');

const userSchema = new mongoose.Schema({
  name: String,
  fans_count: Number
});

const UserModel = db.model('users', userSchema);

module.exports = UserModel;
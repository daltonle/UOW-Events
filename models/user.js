const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

// User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  pwd: {
    type: String,
    minlength: 6,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ["student", "staff", "guest"]
  },
  cardType: {
    type: String,
    required: true,
    enum: ["Debit MasterCard", "VISA", "PayPal", "N/A"],
    default: "N/A"
  },
  cardNumber: {
    type: String,
    required: true,
    default: "N/A"
  },
  phone: {
    type: String
  }
});

var User = module.exports = mongoose.model('User', userSchema); 

// Get User
module.exports.getUsers = function(callback, limit) {
  User.find(callback).limit(limit);
}

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(_username, callback) {
  User.findOne({username: _username}, '_id', callback);
}

// User authentication
module.exports.userAuth = function(user, callback) {
  User.findOne({username: user.username, pwd: user.password}, '_id username', callback);
}

// Add user
module.exports.addUser = function(user, callback) {
  User.create(user, callback);
}

// Modify user
module.exports.updateUser = function(user, callback) {
  User.findByIdAndUpdate(user._id, user, callback);
}
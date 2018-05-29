const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

// Event schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  start: {
    type: String,
    required: true
  },
  finish: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  host: ObjectId,
  capacity: Number,
  desc: String,
  price: {
    type: Number,
    default: 0
  },
  promoCode: String,
  promoValue: {
    type: Number,
    default: 1,
    max: 1,
    min: 0
  },
  image: String,
  attendees: [ObjectId]
});

var Event = module.exports = mongoose.model('Event', eventSchema); 

// Get Events
module.exports.getEvents = function(callback, limit) {
  Event.find(callback).limit(limit).sort({start: 1});
}

module.exports.getEventById = function(id, callback) {
  Event.findById(id, callback);
}

module.exports.getEventsByUser = function(userId, callback) {
  Event.find({attendees: userId}, callback).sort({start: 1});
}

module.exports.getEventsByHost = function(userId, callback) {
  Event.find({host: userId}, callback).sort({start: 1});
}

// Event update
module.exports.updateEventRegister = function(eventId, userId, callback) {
  Event.findByIdAndUpdate(eventId, {$addToSet: {attendees: userId}}, {new: true}, callback);
}

module.exports.updateEventUnregister = function(eventId, userId, callback) {
  Event.findByIdAndUpdate(eventId, {$pull: {attendees: userId}}, {new: true}, callback);
}

// Write to Event
module.exports.writeEvent = function(event, callback) {
  if (event._id) {
    Event.findByIdAndUpdate(event._id, event, {new:true}, callback);
  }
  else {
    Event.create(event, callback);
  }
}

// Delete Event
module.exports.deleteEvent = function(event, callback) {
  Event.findByIdAndRemove(event._id, callback);
}
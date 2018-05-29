const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Event = require('./models/event');
const User = require('./models/user');

const app = express();
mongoose.connect('mongodb://localhost/uow-events');
var db = mongoose.connection;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/api/browse', (req, res) => {
    // retrieve an array of events
    Event.getEvents(function(err, events) {
        if (err) {
        }
        res.json(events);
    })
})

app.get('/api/event/:eventId', function (req, res) {
    Event.getEventById(req.params.eventId, function(err, event) {
        if (err) {
            throw err;
        }
        res.json(event);
    })
})

app.get('/api/browse/filter/:free/:time', (req, res) => {
    
    let time = req.params.time; // value: ('thisWk', 'nextWk', 'all')

    // add code to filter all events and return a string of events
    

    res.status(200).json(events);
})

app.get('/api/event/attendees/:userId', function(req, res) {
    Event.getEventsByUser(req.params.userId, function(err, events) {
        res.json(events);
    })
})

app.get('/api/event/host/:userId', function(req, res) {
    Event.getEventsByHost(req.params.userId, function(err, events) {
        res.json(events);
    })
})

app.post('/api/event/write', function(req, res) {
    Event.writeEvent(req.body, function(err, event) {
        res.json(event);
    })
})

app.delete('/api/event/delete', function(req, res) {
    Event.deleteEvent(req.body, function(err, event) {
        res.json(event);
    })
})

app.get('/api/user/id/:id', (req, res) => {
    User.getUserById(req.params.id, function(err, user){
        if (err){
            throw err;
        }
        res.json(user);
    })
})

app.get('/api/user/username/:username', (req, res) => {
    User.getUserByUsername(req.params.username, function(err, userId) {
        if (err) {}
        res.json(userId);
    })
})

app.post('/api/user/update', function(req, res) {
    User.updateUser(req.body, function(err, user) {
        res.json(user);
    })
})

app.post('/api/user/auth', function(req, res) {
    User.userAuth(req.body, function(err, user) {
        res.json(user);
    })
})

app.post('/api/user/add', function(req, res) {
    let _user = {
        name: req.body.name,
        username: req.body.username,
        pwd: req.body.password,
        email: req.body.email,
        type: 'guest',
        cardType: 'N/A',
        cardNumber: 'N/A'
    }

    User.addUser(_user, function(err, user){
        res.json(user);
    })
})

app.post('/api/booking/:code', function(req, res) {
    let code = req.params.code;
    
    if (code === '1') {
        Event.updateEventRegister(req.body.eventId, req.body.userId, function(err, event){
            res.json(event);
        })
    }
    else if (code === '0') {
        Event.updateEventUnregister(req.body.eventId, req.body.userId, function(err, event){
            res.json(event);
        })
    }
})

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
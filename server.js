const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/api/browse', (req, res) => {
    
    // add code to retrieve an array of events
    
    const events = [
        {
            id: 1,
            title: 'UOW for the Reefs',
            start: '2018-03-25T12:25', 
            finish: '2018-03-25T14:00',
            venue: 'Room 3110, Bld. 65',
            host: 'Wellbeing service',
            capacity: 50,
            desc: 'Iptum blosom do you want to save the turtles? Blosom iptumsempraIptum blosom do you want to save the turtles? Blosom iptumsempra',
            price: 0,
            image: '/images/1.jpg',
            attendees: Int16Array
        },

        {
            id: 2,
            title: 'Cure your insomnia',
            start: '2018-03-25T12:25', 
            finish: '2018-03-25T14:00',
            venue: 'Room 3110, Bld. 65',
            host: 'EIS',
            capacity: 300,
            desc: 'Iptum blosom do you want to save the turtles? Blosom iptumsempra',
            price: 300,
            image: '/images/2.jpg',
            attendees: Int16Array
        },

        {
            id: 3,
            title: 'Cure your insomnia',
            start: '2018-03-25T12:25', 
            finish: '2018-03-25T14:00',
            venue: 'Room 3110, Bld. 65',
            host: 'EIS',
            capacity: 300,
            desc: 'Iptum blosom do you want to save the turtles? Blosom iptumsempra',
            price: 300,
            image: '/images/3.jpg',
            attendees: Int16Array
        },

        {
            id: 4,
            title: 'Cure your insomnia',
            start: '2018-03-25T12:25', 
            finish: '2018-03-25T14:00',
            venue: 'Room 3110, Bld. 65',
            host: 'EIS',
            capacity: 300,
            desc: 'Iptum blosom do you want to save the turtles? Blosom iptumsempra',
            price: 300,
            image: '/images/4.jpg',
            attendees: Int16Array
        }
    ];
    res.json(events);
})

app.get('/api/browse/:eventId', function (req, res) {
    //add code to retrieve an array of events
    
    const events = [
        {
            id: 1,
            title: 'UOW for the Reefs',
            start: '2018-03-25T12:25', 
            finish: '2018-03-25T14:00',
            venue: 'Room 3110, Bld. 65',
            host: 'Wellbeing service',
            capacity: 50,
            desc: 'Iptum blosom do you want to save the turtles? Blosom iptumsempra',
            price: 0,
            image: '/images/1.jpg',
            attendees: Int16Array
        },

        {
            id: 2,
            title: 'Cure your insomnia',
            start: '2018-03-25T12:25', 
            finish: '2018-03-25T14:00',
            venue: 'Room 3110, Bld. 65',
            host: 'EIS',
            capacity: 300,
            desc: 'Iptum blosom do you want to save the turtles? Blosom iptumsempra',
            price: 300,
            image: '/images/2.jpg',
            attendees: Int16Array
        },

        {
            id: 3,
            title: 'Cure your insomnia',
            start: '2018-03-25T12:25', 
            finish: '2018-03-25T14:00',
            venue: 'Room 3110, Bld. 65',
            host: 'EIS',
            capacity: 300,
            desc: 'Iptum blosom do you want to save the turtles? Blosom iptumsempra',
            price: 300,
            image: '/images/3.jpg',
            attendees: Int16Array
        },

        {
            id: 4,
            title: 'Cure your insomnia',
            start: '2018-03-25T12:25', 
            finish: '2018-03-25T14:00',
            venue: 'Room 3110, Bld. 65',
            host: 'EIS',
            capacity: 300,
            desc: 'Iptum blosom do you want to save the turtles? Blosom iptumsempra',
            price: 300,
            image: '/images/4.jpg',
            attendees: Int16Array
        }
    ];

    events.forEach(function(event) {
        if (event.id == req.params.eventId)
            res.json(event);
    });
})

app.get('/api/browse/filter/:loc/:time', (req, res) => {
    let location = req.params.loc; // this value will be one of the following ('main', 'sws', 'inno', 'all')
    let time = req.params.time; // value: ('thisWk', 'nextWk', 'all')
    console.log(`${location} ${time}`);

    // add code to filter all events and return a string of events
    let events = [
        {
            id: 1,
            title: 'UOW for the Reefs',
            start: '2018-03-25T12:25', 
            finish: '2018-03-25T14:00',
            venue: 'Room 3110, Bld. 65',
            host: 'Wellbeing service',
            capacity: 50,
            desc: 'Iptum blosom do you want to save the turtles? Blosom iptumsempra',
            price: 0,
            image: '/images/1.jpg',
            attendees: Int16Array
        },

        {
            id: 3,
            title: 'Cure your insomnia',
            start: '2018-03-25T12:25', 
            finish: '2018-03-25T14:00',
            venue: 'Room 3110, Bld. 65',
            host: 'EIS',
            capacity: 300,
            desc: 'Iptum blosom do you want to save the turtles? Blosom iptumsempra',
            price: 300,
            image: '/images/3.jpg',
            attendees: Int16Array
        },

        {
            id: 4,
            title: 'Cure your insomnia',
            start: '2018-03-25T12:25', 
            finish: '2018-03-25T14:00',
            venue: 'Room 3110, Bld. 65',
            host: 'EIS',
            capacity: 300,
            desc: 'Iptum blosom do you want to save the turtles? Blosom iptumsempra',
            price: 300,
            image: '/images/4.jpg',
            attendees: Int16Array
        }
    ];

    res.status(200).json(events);
})

app.post('/profile', function(req, res) {
    let userId = req.body.id;

    let user;
    // search for userID in database and assign to variable user
    let user1 = {
        id: 152634,
        username: 'ndl991',
        email: 'ndl991@uowmail.edu.au',
        name: 'P Sherman',
        type: 'student',
        faculty: 'EIS',
        cardType: 'Debit Mastercard',
        cardNumber: '5656565685859595',
        phone: '0123456789',
        address: '42 Wallaby Way, Sydney'
    };
    let user2 = {
        id: 152634,
        username: 'abcx56',
        email: 'abcx.ioru56@gmail.com',
        name: 'P Sherman',
        type: 'guest',
        faculty: 'EIS',
        cardType: 'Debit Mastercard',
        cardNumber: '5656565685859595',
        phone: '0123456789',
        address: '42 Wallaby Way, Sydney'
    };

    res.status(200).json(user1);
})

app.post('/profile/edit', function(req, res) {
    let _id = req.body.id;
    let _email = req.body.email;
    let _phone = req.body.phone;
    let _address = req.body.address;
    let _cardType = req.body.cardType;
    let _cardNumber = req.body.cardNumber;

    // update user details and return new user details below
    let user = {
        id: 152634,
        username: 'abcx56',
        email: 'abcx.ioru56@gmail.com',
        name: 'P Sherman',
        type: 'guest',
        faculty: 'N/A',
        cardType: 'VISA',
        cardNumber: '5656565685859595',
        phone: '0123456789',
        address: '42 Wallaby Way, Sydney'
    } // fake data

    res.status(200).json(user);
})

app.post('/login', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let flag;
    let user;
    // verify username and password here
    // if (correct) set flag=true and user={id: foundID, username: foundUsername};
    // else set flag=false;
    flag = true;
    user = {
        id: 1,
        username: 'ndl991',
        events: [1, 3],
        cardType: 'VISA',
        cardNumber: '4556 5656 8985 8958'
    } // fake test data

    if (flag === false) {
        res.status(400).json('Incorrect username or password.');
    }
    else {
        res.status(201).json(user);
    }
})

app.post('/signup', function(req, res) {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    let flag;
    let user;
    // verify email and username here (see if any duplicates in database)
    // if all good set flag = true, create a new user in database and pass user data into variable user.
    flag = true;
    user = {
        id: 1,
        username: 'ndl991',
        events: [],
        cardType: '',
        cardNumber: ''
    } // fake test data

    if (flag === false) {
        res.status(400).json('Email or username unavailable.');
    }
    else {
        res.status(201).json(user);
    }
})

app.post('/booking/:code', function(req, res) {
    let userId = req.body.userId;
    let eventId = req.body.eventId;
    let code = req.params.code;

    let user;
    if (code === '1') {
        // add userID into event.attendees in database
        // set new data for user
        user = {
            id: 1,
            username: 'ndl991',
            events: [1, 2, 3]
        } // fake data
        res.status(200).json(user);
    }
    else {
        // remove userID from event.attendees in database
        // set new data for user
        user = {
            id: 1,
            username: 'ndl991',
            events: [1, 3]
        }
        res.status(200).json(user);
    }
})

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
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
        username: 'ndl991'
    } // fake test data

    if (flag === false) {
        res.status(400).json('Incorrect username or password.');
    }
    else {
        res.status(201).json(user);
    }
})

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
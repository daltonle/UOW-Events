const express = require('express');

const app = express();

app.get('/', (req, res) => {
    const events = [
        {
            id: 1,
            title: 'UOW for the Reefs',
            time: '20:00 20 Dec',
            location: 'Room 3110, Bld. 65',
            faculty: 'Wellbeing service',
            capacity: 50,
            price: 0,
            attendees: Int16Array
        },

        {
            id: 2,
            title: 'Cure your insomnia',
            time: '13:30 26 Apr',
            location: 'Room 3110, Bld. 65',
            faculty: 'EIS',
            capacity: 300,
            price: 300,
            attendees: Int16Array
        }
    ];

    res.json(events);
})

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@database:27017/tasks?authSource=admin`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(r => {
        console.log('Connected to MongoDB');
        app.listen(8080, () => console.log('Server is running on port 8080'));
    })
    .catch(e => {
        console.log('Error connecting to MongoDB');
        console.log(e);
    });

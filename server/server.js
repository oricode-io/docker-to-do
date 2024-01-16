const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Task = require('./models/Task');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/tasks', (req, res) => {
    Task.find()
        .then(tasks => res.send(tasks))
        .catch(e => res.status(400).send(e));
});

app.post('/tasks', (req, res) => {
    if (req.body.name.length === 0) {
        return res.status(400).send({
            message: 'Task name cannot be empty',
        });
    }

    const task = new Task({
        name: req.body.name,
    });

    task.save()
        .then(r => res.send({
            message: 'Task created successfully',
            task: r,
        }))
        .catch(e => res.status(400).send(e));
});

app.delete('/tasks/:id', (req, res) => {
    Task.findByIdAndDelete({_id: req.params.id})
        .then(r => {
            if (!r) {
                return res.status(404).send({
                    message: 'Task not found',
                })
            } else {
                return res.send({
                    message: 'Task deleted successfully',
                });
            }
        })
        .catch(e => res.status(400).send(e));
});

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

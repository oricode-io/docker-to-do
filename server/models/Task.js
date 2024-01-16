const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: String,
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;

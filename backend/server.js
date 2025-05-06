const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/Todo')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(5000, () => {
    console.log('Server listening on port: 5000');
});

// Create a task
app.post('/add', (req, res) => {
    const { task, date } = req.body;
    TodoModel.create({ task, date, done: false })
        .then(result => res.json(result))
        .catch(err => console.log(err));
});

// Get all tasks
app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => console.log(err));
});

// Toggle done status
app.put('/edit/:id', async (req, res) => {
    try {
        const todo = await TodoModel.findById(req.params.id);
        const updated = await TodoModel.findByIdAndUpdate(
            req.params.id,
            { done: !todo.done },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update task (optionally date)
app.put('/update/:id', (req, res) => {
    const { task, date } = req.body;
    const updateFields = { task };
    if (date) updateFields.date = date;

    TodoModel.findByIdAndUpdate(req.params.id, updateFields, { new: true })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Delete task
app.delete('/delete/:id', (req, res) => {
    TodoModel.findByIdAndDelete(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

module.exports = app;

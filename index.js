const express = require('express');
const dotenv = require('dotenv');

const connectToDatabase = require('./src/database/mongoose.database');
const TaskModel = require('./src/models/task.model');

dotenv.config();
const app = express();
app.use(express.json());

connectToDatabase();

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/tasks', async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);

        await newTask.save();

        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/tasks/:id', async (req, res) => {
    const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);

    const taskToDelete = await TaskModel.findById(req.params.id);
    if (!taskToDelete) {
        return res.status(500).send('Task not Found!');
    }
    res.status(200).send(deletedTask);
});

app.listen(3000, () => {
    console.log('Servidor Online');
});

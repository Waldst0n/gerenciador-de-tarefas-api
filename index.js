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

app.get('/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const task = await TaskModel.findById(id);

        if (!task) {
            res.status(404).send('Task not found');
        }

        return res.status(200).send(task);
    } catch (error) {
        res.send(404).send(error.message);
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

app.patch('/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const taskData = req.body;

        const taskToUpdate = await TaskModel.findById(id);

        const allowedUpdate = ['isCompleted'];
        const requestedUpdate = Object.keys(taskData);

        for (update of requestedUpdate) {
            if (allowedUpdate.includes(update)) {
                taskToUpdate[update] = taskData[update];
            } else {
                return res.status(500).send('There are non-editable fields');
            }
        }

        await taskToUpdate.save();

        return res.status(200).send(taskToUpdate);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/tasks/:id', async (req, res) => {
    const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);

    const taskToDelete = await TaskModel.findById(req.params.id);
    if (!taskToDelete) {
        return res.status(404).send('Task not Found!');
    }
    res.status(200).send(deletedTask);
});

app.listen(3000, () => {
    console.log('Servidor Online');
});

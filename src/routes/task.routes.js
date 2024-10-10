const express = require('express');

const TaskController = require('../controllers/tasks.controller');
const TaskModel = require('../models/task.model');
const router = express.Router();

router.get('/', async (req, res) => {
    return new TaskController(req, res).getTasks();
});

router.get('/:id', async (req, res) => {
    return new TaskController(req, res).getTaskById();
});

router.post('/', async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);

        await newTask.save();

        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
    const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);

    const taskToDelete = await TaskModel.findById(req.params.id);
    if (!taskToDelete) {
        return res.status(404).send('Task not Found!');
    }
    res.status(200).send(deletedTask);
});

module.exports = router;

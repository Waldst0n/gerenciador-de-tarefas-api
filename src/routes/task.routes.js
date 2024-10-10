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
    return new TaskController(req, res).createTask();
});

router.patch('/:id', async (req, res) => {
    return new TaskController(req, res).updateTask();
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

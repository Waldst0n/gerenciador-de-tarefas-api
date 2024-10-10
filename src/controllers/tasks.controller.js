const { default: mongoose } = require('mongoose');
const { notAllowedfieldsToUpdateError } = require('../errors/general.errors');
const { notFoundError, objectIdError } = require('../errors/mongodb.errors');
const TaskModel = require('../models/task.model');

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getTasks() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getTaskById() {
        try {
            const id = this.req.params.id;
            const task = await TaskModel.findById(id);

            if (!task) return notFoundError(this.res);

            return this.res.status(200).send(task);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdError(this.res);
            }

            this.res.send(404).send(error.message);
        }
    }

    async createTask() {
        try {
            const newTask = new TaskModel(this.req.body);

            await newTask.save();

            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async updateTask() {
        try {
            const id = this.req.params.id;
            const taskData = this.req.body;

            const taskToUpdate = await TaskModel.findById(id);

            if (!taskToUpdate) {
                return notFoundError(this.res);
            }

            const allowedUpdate = ['isCompleted'];
            const requestedUpdate = Object.keys(taskData);

            for (const update of requestedUpdate) {
                if (allowedUpdate.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    return notAllowedfieldsToUpdateError(this.res);
                }
            }

            await taskToUpdate.save();

            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdError(this.res);
            }

            this.res.status(500).send(error.message);
        }
    }

    async deleteTask() {
        try {
            const taskId = this.req.params.id;

            const taskToDelete = await TaskModel.findById(taskId);

            if (!taskToDelete) {
                return notFoundError(this.res);
            }

            const deletedTask = await TaskModel.findByIdAndDelete(taskId);

            this.res.status(300).send(deletedTask);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdError(this.res);
            }

            this.res.status(500).send('Not Found');
        }
    }
}

module.exports = TaskController;

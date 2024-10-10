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

            if (!task) {
                this.res.status(404).send('Task not found');
            }

            return this.res.status(200).send(task);
        } catch (error) {
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

            const allowedUpdate = ['isCompleted'];
            const requestedUpdate = Object.keys(taskData);

            for (const update of requestedUpdate) {
                if (allowedUpdate.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    return this.res
                        .status(500)
                        .send('There are non-editable fields');
                }
            }

            await taskToUpdate.save();

            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;

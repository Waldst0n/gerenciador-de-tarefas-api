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
}

module.exports = TaskController;

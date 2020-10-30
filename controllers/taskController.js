const Task = require('../models/Task');

exports.addTask = (req, res) => {
    try {
        const task = new Task(req.body);

        task.projectId = req.body.projectId;
        task.userId = req.userId;

        task.save();

        res.json(task);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error caught');
    }
};

exports.synchronizeTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ projectId: req.params.id }).sort({ createdAt: -1 });
        res.json({ tasks });
    } catch (error) {
        res.status(500).send('Error caught');
        console.log(error);
    }
};

exports.updateNameOrStatus = async (req, res) => {
    try {
        const { newName, oldStatus } = req.body;

        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: 'Task could not be found in database!' });
        }

        // Make sure the project really belongs to the user who's trying to delete it.
        if (task.userId.toString() !== req.userId) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        if (oldStatus) {
            if (task.status === "incomplete") {
                task.status = "complete";

            } else {
                task.status = "incomplete";
            }

        } else if (newName) {
            task.name = newName;
        }

        task.save();

        res.json(task);

    } catch (error) {
        console.log(error);
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(401).json({ msg: "Task could not be found in database!" });
        }

        // Make sure the project really belongs to the user who's trying to delete it.
        if (task.userId.toString() !== req.userId) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        await Task.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Task successfully deleted!' });

    } catch (error) {
        console.log(error);
    }
};
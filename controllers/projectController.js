const Project = require('../models/Project');

exports.addProject = (req, res) => {

    try {
        const project = new Project(req.body);

        project.userId = req.userId;

        project.save();
        res.json(project);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error caught');
    }
};

exports.synchronizeProjects = async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json({ projects });
    } catch (error) {
        res.status(500).send('Error caught');
        console.log(error);
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            res.status(401).json({ msg: "Project could not be found in database!"})
        }

        // Make sure the project really belongs to the user who's trying to delete it.
        if (project.userId.toString() !== req.userId) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        await Project.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Project successfully deleted!' });

    } catch (error) {
        console.log(error)
    }
}
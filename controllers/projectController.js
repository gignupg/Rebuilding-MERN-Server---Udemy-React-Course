const Project = require('../models/Project');

exports.addProject = (req, res) => {

    try {
        const project = new Project(req.body);

        project.userId = req.user.id;

        project.save();
        res.json(project);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error caught');
    }
};
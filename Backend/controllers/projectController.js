const Project = require("../models/project");

const createProject = async (req, res) => {
    try {
        const newproject = new Project(req.body);
        await newproject.save();
        res.status(201).json(newproject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const allProject = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createProject, allProject };

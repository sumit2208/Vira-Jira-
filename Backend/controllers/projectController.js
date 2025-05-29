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

const ProjectById = async (req,res)=>{  
    try{
         const {id} = req.params;
         const project = await Project.findById(id);
         if(!project){
            return res.status(404).json({message:"Projet Not Found"})
         }
         res.status(200).json(project) 

    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

const DeleteProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ message: "Project Not Found" });
        }
        res.status(200).json({ message: "Project deleted successfully", deletedProject });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




module.exports = { createProject, allProject,ProjectById ,DeleteProjectById};

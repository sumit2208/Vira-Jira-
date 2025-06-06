const Project = require("../models/project");
const emailService = require("../services/emailService");


// controllers/projectController.js
const getProjectsForUser = async (req, res) => {
  try {
    const userEmail = req.query.email;

    if (!userEmail) {
      return res.status(400).json({ message: "User email is required" });
    }

    const projects = await Project.find({ members: userEmail });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Add a member to a project
const addMemberToProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: "Project Not Found" });
        }
        
        // Check if member already exists
        if (project.members.includes(email)) {
            return res.status(400).json({ message: "Member already exists in the project" });
        }
        
        // Add member to project
        project.members.push(email);
        await project.save();
        
        // Send invitation email
        try {
            // Get the inviter's email (you might need to modify this based on your authentication system)
            const inviterEmail = req.user ? req.user.email : 'The team';
            
            await emailService.sendProjectInvitation(email, project, inviterEmail);
            console.log(`Invitation email sent to ${email}`);
        } catch (emailError) {
            console.error('Failed to send invitation email:', emailError);
            // We don't want to fail the entire operation if just the email fails
            // So we continue with the response
        }
        
        res.status(200).json({ message: "Member added successfully and invitation email sent", project });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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




module.exports = { createProject, allProject, ProjectById, DeleteProjectById, addMemberToProject, getProjectsForUser };

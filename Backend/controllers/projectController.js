const project =  require("../models/project")


const createProject = async (req,res)=> {
    try {
         const newproject = new project(req.body)
         await newproject.save()
         res.status(201).json(newproject)
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

const allProject = async(req,res) =>{
    try {
         const projects  = await projects .find();
         res.status(201).json(projects )
    } catch (error) {   
        res.status(500).json({errro:err.message})
    }
}
 

 module.exports = { createProject,allProject };
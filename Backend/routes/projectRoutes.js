const express = require("express");
const router = express.Router();
const { allProject, createProject, ProjectById, DeleteProjectById, addMemberToProject, getProjectsForUser } = require("../controllers/projectController");

router.get("/getproject", allProject);
router.post("/createproject", createProject);
router.get("/project/:id", ProjectById);
router.delete("/delete/:id", DeleteProjectById);
router.post("/project/:id/invite", addMemberToProject); 
router.get("/user-projects", getProjectsForUser);


module.exports = router;

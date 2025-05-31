const express = require("express");
const router = express.Router();
const { allProject, createProject, ProjectById, DeleteProjectById, addMemberToProject } = require("../controllers/projectController");

router.get("/getproject", allProject);
router.post("/createproject", createProject);
router.get("/project/:id", ProjectById);
router.delete("/delete/:id", DeleteProjectById);
router.post("/project/:id/invite", addMemberToProject);

module.exports = router;

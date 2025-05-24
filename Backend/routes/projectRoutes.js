const express = require("express");
const router = express.Router();
const { allProject, createProject, ProjectById ,DeleteProjectById} = require("../controllers/projectController");

router.get("/getproject", allProject);
router.post("/createproject", createProject);
router.get("/project/:id",ProjectById)
router.delete("/delete/:id",DeleteProjectById)

module.exports = router;

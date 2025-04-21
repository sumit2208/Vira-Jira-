const express = require("express");
const router = express.Router();
const { allProject, createProject, ProjectById } = require("../controllers/projectController");

router.get("/getproject", allProject);
router.post("/createproject", createProject);
router.get("/project/:id",ProjectById)

module.exports = router;

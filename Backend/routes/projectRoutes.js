const express = require("express")
const router = express.Router()
const {allProject,createProject} = require("../controllers/projectController")

router.get("./getproject",allProject)
router.post("./createproject",createProject)
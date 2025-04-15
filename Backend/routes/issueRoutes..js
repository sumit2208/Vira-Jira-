const express = require("express");
const router = express.Router();
const { createIssue, getIssues } = require("../controllers/issueController");

router.post("/create", createIssue);
router.get("/get", getIssues);

module.exports = router;

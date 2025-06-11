const express = require("express");
const router = express.Router();
const { createIssue, getIssues, DeleteIssue , GetIssueByProject ,getIssueForUser} = require("../controllers/issueController");

router.post("/create", createIssue);
router.get("/get", getIssues);
router.delete("/delete/:id",DeleteIssue)
router.get("/projectissue/:ProjectName",GetIssueByProject) 
router.get("/user-issue",getIssueForUser)

module.exports = router; 
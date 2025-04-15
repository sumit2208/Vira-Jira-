const issue = require("../models/issue")


const createIssue = async (req,res)=>{
    try{
        const newIssue = new issue(req.body);
        await newIssue.save();
        res.status(201).json(newIssue)
    }catch (err) {
        res.status(500).json({ error: err.message });
      }
}

const getIssues = async (req, res) => {
    try {
      const issues = await issue.find();
      res.status(200).json(issues);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  module.exports = { createIssue, getIssues };
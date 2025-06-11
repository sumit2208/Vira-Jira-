const issue = require("../models/issue");

const createIssue = async (req, res) => {
  try {
    const newIssue = new issue(req.body);
    await newIssue.save();
    res.status(201).json(newIssue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getIssues = async (req, res) => {
  try {
    const issues = await issue.find();
    res.status(200).json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const DeleteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteIsuue = await issue.findByIdAndDelete(id);
    if (!deleteIsuue) {
      return res.status(404).json({ message: "Project Not Found" });
    }
    res
      .status(200)
      .json({ message: "Isuue deleted successfully", deleteIsuue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GetIssueByProject = async (req,res)=>{
  try{
    const {ProjectName} = req.params;
    const Fetch = await issue.find({project:ProjectName})
    res.status(200).json(Fetch);
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIssueForUser = async (req, res) => {
  try {
    const userEmail = req.query.email;

    if (!userEmail) {
      return res.status(400).json({ message: "User email is required" });
    }

    const issues = await issue.find({ members: { $elemMatch: { email: userEmail } } });
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = { createIssue, getIssues, DeleteIssue , GetIssueByProject ,getIssueForUser};

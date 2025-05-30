const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  title: String,
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium"
  },
  project:String,
  assignee: String,
  description:String,
    date:Date,
  type: {
    type: String,
    enum: ["bug", "code", "doc"],
    default: "doc"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: "vira" }); // 👈 Explicitly set collection name

module.exports = mongoose.model("vira", issueSchema);

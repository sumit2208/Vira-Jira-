const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  title: String,
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium"
  },
  assignee: String,
  type: {
    type: String,
    enum: ["bug", "code", "doc"],
    default: "doc"
  }
}, { collection: "vira" }); // 👈 Explicitly set collection name

module.exports = mongoose.model("Issue", issueSchema);

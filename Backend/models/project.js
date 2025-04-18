const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  project_key: {
    type: String, 
  },
  members: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: "project" });

module.exports = mongoose.model("project", ProjectSchema);

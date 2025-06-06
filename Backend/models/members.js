const mongoose = require("mongoose");
const { Schema } = mongoose;

const MemberSchema = new Schema({
  userId: {
    type: String, // Clerk user ID
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "editor", "viewer"],
    default: "viewer",
  },
  invitedBy: {
    type: String, // Clerk user ID of inviter
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = MemberSchema; // not a model yet

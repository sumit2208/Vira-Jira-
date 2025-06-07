const mongoose = require("mongoose");
const { Schema } = mongoose;

const MemberSchema = new Schema({
  UserEmail: {
    type: String, // Clerk user Email
    required: true,
  },
  role: {
    type: String,
    enum: ["admin",  "User"],
    default: "User",
  },
  invitedBy: {
    type: String, // Clerk user ID of inviter
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
},{ collection: "members" });

module.exports = mongoose.model("members",MemberSchema); 

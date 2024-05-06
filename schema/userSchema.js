const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: [String], enum: ['USER', 'MODERATOR', 'ADMIN'], default: ['USER'] }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("users", userSchema);

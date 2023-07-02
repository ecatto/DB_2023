const mongoose = require("mongoose");
const { Schema } = mongoose;

const ownerSchema = new Schema(
  {
    twitter: String,
    tastings: Number,
    name: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Owner", ownerSchema);
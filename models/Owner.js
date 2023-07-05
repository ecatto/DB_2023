const mongoose = require("mongoose");
const { Schema } = mongoose;

const ownerSchema = new Schema(
  {
    name: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Owner", ownerSchema);
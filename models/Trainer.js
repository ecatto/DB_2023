const mongoose = require("mongoose");
const { Schema } = mongoose;

const trainerSchema = new Schema(
  {
    name: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trainer", trainerSchema);
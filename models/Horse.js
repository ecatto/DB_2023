const mongoose = require("mongoose");
const { Schema } = mongoose;

const HorseSchema = new Schema(
  {
    name: String,
    yob: Number,
    colour: String,
    owner: String,
    suitability: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Horse", HorseSchema);
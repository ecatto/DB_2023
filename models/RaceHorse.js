const mongoose = require("mongoose");
const { Schema } = mongoose;

const raceHorseSchema = new Schema(
  {
    name: String,
    yob: Number,
    colour: String,
    owner: String,
    racesRun: Number,
    racesWon: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("RaceHorse", raceHorseSchema);
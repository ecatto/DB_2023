//config

require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const app = express();
app.set("view engine", "ejs");

//controllers

const raceHorseController = require("./controllers/raceHorse");
const ownerController = require("./controllers/owner");
const trainerController = require("./controllers/trainer");


const { WEB_PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});



app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

//app.use("/views");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/addrecord", (req, res) => {
  res.render("addrecord");
});

app.get("/deleterecord", (req, res) => {
  res.render("deleterecord");
});

app.get("/search", raceHorseController.list);

app.get("/search/delete/:id", raceHorseController.delete);

app.get("/horses");


//, (req, res) => {
//  res.render("search");
//});

app.get("/update", (req, res) => {
  res.render("update");
});




const Horse = mongoose.model('RaceHorse');
const kitty = new Horse({ "name" : "Rule the world", "yob" : 2014, "colour" : "bay", racesWon: 12});
kitty.save();
//kitty.save().then(() => console.log('meow'));

//insertOne(
//  { "name" : "Rule the world", "yob" : 2014, "colour" : "bay"}
//);

app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});
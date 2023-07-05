//config

require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.set("view engine", "ejs");

//controllers

const HorseController = require("./controllers/Horse");
const ownerController = require("./controllers/owner");
const trainerController = require("./controllers/trainer");


const { WEB_PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});

app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/views")));

//app.use("/views");

app.get("/", (req, res) => {
  res.render("index");
});


app.get("/displayOne", HorseController.list);



app.get("/searchAll", HorseController.list);

app.get("/searchAll/delete/:id", HorseController.delete);


app.get("/searchOne", (req, res) => {
  res.render("searchOne", { errors: {} });
});
app.post("/searchOne/", HorseController.searchOne);


app.get("/searchCat", (req, res) => {
  res.render("searchCat");
});


app.get("/create-horse", (req, res) => {
  res.render("newhorse", { errors: {} });
});
app.post("/create-horse", HorseController.create);



app.get("/update", (req, res) => {
  res.render("update");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/searchHorses", (req, res) => {
  res.render("searchHorses");
});

app.get("/template", (req, res) => {
  res.render("template");
});

//const Horse = mongoose.model('RaceHorse');
//const kitty = new Horse({ "name" : "Rule the world", "yob" : 2014, "colour" : "bay", racesWon: 12});
//kitty.save();
//kitty.save().then(() => console.log('meow'));

//insertOne(
//  { "name" : "Rule the world", "yob" : 2014, "colour" : "bay"}
//);

app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});
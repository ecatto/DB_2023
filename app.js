//config
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.set("view engine", "ejs");

//controllers

const horseController = require("./controllers/horse");
const ownerController = require("./controllers/owner");
const userController = require("./controllers/user");


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


app.get("/searchAll", horseController.list);
app.get("/searchAll/delete/:id", horseController.delete);
app.get("/searchAll/update/:id", horseController.edit);
app.post("/searchAll/update/:id", horseController.update);


app.get("/searchOne", (req, res) => {
  res.render("searchOne", { errors: {} });
});
app.post("/searchOne/", horseController.searchOne);
app.get("/displayOne", horseController.list);

app.get("/searchCat", (req, res) => {
  res.render("searchCat");
});


app.get("/create-horse", (req, res) => {
  res.render("newhorse", { errors: {} });
});
app.post("/create-horse", horseController.create);



app.get("/updateHorse", (req, res) => {
  res.render("updateHorse");
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


app.listen(WEB_PORT, () => {
  console.log(`Example app listening at http://localhost:${WEB_PORT}`);
});

const Owner = require('../models/Owner');
const Trainer = require('../models/Trainer');
const Horse = require("../models/RaceHorse");


exports.list = async (req, res) => {
    try {
      const horses = await Horse.find({});
      res.render("search", { horses: horses });
    } catch (e) {
      res.status(404).send({ message: "could not list horses" });
    }
  };

  exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
      await Horse.findByIdAndRemove(id);
      res.redirect("/search");
    } catch (e) {
      res.status(404).send({
        message: `could not delete record ${id}.`,
      });
    }
  };

  exports.create = async (req, res) => {
    console.log(req.body);

    try {
      const horse = new Horse({name : req.body.name, "yob" : 2014, "colour" : "bay", racesWon: 12});
      await horse.save();
      res.redirect('/search/?message=taster has been created')
    } catch (e) {
      if (e.errors) {
        console.log('here are our errors');
        console.log(e.errors);
        res.render('create-horse', { errors: e.errors })
        return;
      }
      return res.status(400).send({
        message: JSON.parse(e),
      });
    }
  }


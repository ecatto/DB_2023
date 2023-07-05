
const Owner = require('../models/Owner');
const User = require('../models/User');
const Horse = require("../models/Horse");


exports.list = async (req, res) => {
    try {
      const message = req.query.message;
      const horses = await Horse.find({});
      res.render("searchAll", { horses: horses, message: message });
    } catch (e) {
      res.status(404).send({ message: "could not list horses" });
    }
  };

  exports.listOne = async (req, res) => {
    console.log(req.body);
    try {
      const message = req.query.message;
      const horses = await Horse.find({name:""});
      res.render("searchOne", { horses: horses, message: message });
    } catch (e) {
      res.status(404).send({ message: "could not list horses" });
    }
  };
  

  exports.searchOne = async (req, res) => {

    console.log(req.body);
    const horsename = req.body.horsename;
    console.log(horsename);
    console.log(req.body.horsename);
    try {
      const message = req.query.message;
      const horses = await Horse.find({name:req.body.horsename});
      res.render("displayOne", { horses: horses, message: message });
    } catch (e) {
      res.status(404).send({ message: "could not list horses" });
    }
  };





  exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
      await Horse.findByIdAndRemove(id);
      res.redirect("/searchAll");
    } catch (e) {
      res.status(404).send({
        message: `could not delete record ${id}.`,
      });
    }
  };

  exports.create = async (req, res) => {
    console.log(req.body);
    console.log(req.body.name);
    const message = req.query.message;

    try {
      const horse = new Horse({name : req.body.name, yob : req.body.yob, colour : req.body.horsecolour});
      result = await horse.save();
      res.redirect('/searchHorses');
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

exports.edit = async(req,res) =>{
  const id = req.params.id;
  try {
    const taster = await Taster.findById(id);
    res.render('update-taster', { taster: taster, id: id });
  } catch (e) {
    res.status(404).send({
      message: `could find taster ${id}.`,
    });
  }
}

exports.update = async (req, res) =>{
  const id = req.params.id;
  try {
    const taster = await Taster.updateOne({ _id: id }, req.body);
    res.redirect('/tasters/?message=taster has been updated');
  } catch (e) {
    res.status(404).send({
      message: `could find taster ${id}.`,
    });
  }
}
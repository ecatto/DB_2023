
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

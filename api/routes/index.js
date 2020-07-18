var express = require("express");
var router = express.Router();
var dbConnect = require("./../../database_config");
var mongoose = require("mongoose");

const sectionModel = require("../../models/questionnaire_sections");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/section/create", function(req, res, next) {
  section = new sectionModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name
  });
  section
    .save()
    .then(result => {
      console.log(console.log(result));
      res.status(201).json({
        message: "Success",
        section: {
          _id: result._id,
          name: result.name
        }
      });
    })
    .catch(err => {
      console.log(err, "here");
      res.status(500).json({
        response: err
      });
    });
});

router.get("/section/get/all", function(req, res) {
  sectionModel
    .find()
    .select('name _id')
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(201).json({
          response: doc
        });
      } else {
        res.status(404).json({
          message: "No Sections"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        response: err
      });
    });
});

router.get("/section/get/:sectionId", function(req, res) {
  let sectionId = req.params.sectionId;
  sectionModel
    .findById(sectionId)
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(201).json({
          response: doc
        });
      } else {
        res.status(404).json({
          message: "Invalid ID"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        response: err
      });
    });
});

router.delete("/section/delete/:sectionId", function(req, res) {
  let sectionId = req.params.sectionId;
  sectionModel
    .remove({_id: sectionId})
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(201).json({
          response: doc
        });
      } else {
        res.status(404).json({
          message: "Invalid ID"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        response: err
      });
    });
});

router.patch("/section/update/:sectionId", function(req, res) {
  let sectionId = req.params.sectionId;
  let ops = {}
  for(const op of req.body){
    ops[op.name] = op.value
  }
  sectionModel
    .update({_id: sectionId},{
      $set: ops
    })
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(201).json({
          response: doc
        });
      } else {
        res.status(404).json({
          message: "Invalid ID"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        response: err
      });
    });
});
module.exports = router;

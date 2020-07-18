const questionnaireModel = require("../models/questionnaire");
var mongoose = require("mongoose");

exports.orders_get_all = function(req, res, next) {
  questionnaireModel
    .find()
    .select("_id question section image")
    .populate('section', 'name')
    .exec()
    .then(data => {
      res.status(201).json({
        error: false,
        response: data
      });
    })
    .catch(err => {
      res.status(500).json({
        error: true,
        message: err
      });
    });
}

exports.order_create_new = function(req, res, next) {
  question = new questionnaireModel({
    _id: new mongoose.Types.ObjectId(),
    question: req.body.question,
    section: req.body.section,
    image: req.file.filename
  });
  question
    .save()
    .then(data => {
      console.log(data);
      res.status(201).json({
        error: false,
        response: data
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: err
      });
    });
};
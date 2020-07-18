var express = require("express");
var router = express.Router();
var dbConnect = require("./../../database_config");
var mongoose = require("mongoose");
const multer = require('multer');
const checkAuth = require('./../middleware/auth');

const questionnaireModel = require("../../models/questionnaire");
const QuestionnaireController = require("./../../controllers/questionnaire")

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null,'./uploads/');
  },
  filename: function(req, file, cb){
    cb(null,new Date().toISOString()+ file.originalname);
  }
})

var upload = multer({storage: storage})

router.get("/", checkAuth, QuestionnaireController.orders_get_all);

router.post("/", upload.single('questionImage'), checkAuth, QuestionnaireController.order_create_new);

router.delete("/:questionId", function(req, res, next) {
  console.log(req.body);
  questionnaireModel
    .remove({ _id: req.params.questionId })
    .then(data => {
      console.log(data);
      res.status(201).json({
        error: false,
        response: "Question Deleted Successfully",
        question_id: req.params.questionId
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: true,
        message: err
      });
    });
});

module.exports = router;

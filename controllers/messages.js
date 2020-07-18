const messagesModel = require("../models/messages");
const multer = require("multer");
var mongoose = require("mongoose");

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null,'./uploads/');
  },
  filename: function(req, file, cb){
    cb(null,new Date().toISOString()+ file.originalname);
  }
})

var upload = multer({storage: storage})

exports.updateMessage = function(req, res){
    console.log(res.media);

    message = new messagesModel({
        _id: new mongoose.Types.ObjectId(),
        room_id: req.room_id,
        message_type: req.message_type,
        text: req.text || '',
        media: req.media,
        sent_by: req.sent_by,
        received_by: null,
        timestamp: req.timestamp,
    })
    message
    .save()
    .then(data => {
      console.log(data);
       res({
        error: false,
        response: data
       });
    })
    .catch(err => {
      console.log(err);
      res({
        error: true,
        message: err
      });
    });
}

exports.getMessages = function(res){
    res('bleh')
}
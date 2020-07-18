var express = require("express");
var router = express.Router();

const messagesModel = require("../../models/messages");


router.post("/message-chunk-fetch", function(req, res, next) {
    console.log(req)
    messagesModel
    .find({ 
        room_id: req.body.room_id,
        timestamp: {"$lt": req.body.timestamp}
    })
    .sort({timestamp: -1})
    .limit(10)
    .exec()
    .then(messages => {
        return res.status(200).json({
            error: false,
            response: messages
        });
    })
    .catch(err => error(res, err));
})

module.exports = router;
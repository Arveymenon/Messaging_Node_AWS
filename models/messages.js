const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  room_id: {
      type: String,
      required: true
  },
  timestamp: {
      type: Date,
      required: true
  },
  message_type: {
      type: Number,
      required: true
  },
  text: {
      type: String,
      required: false
  },
  media: {
      type: String,
      required: false
  },
  sent_by: {
      type: String,
      required: true
  },
  received_by: {
      type: [],
      required: false
  },
});

module.exports = mongoose.model("Message", messageSchema);

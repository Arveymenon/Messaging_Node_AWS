const mongoose = require("mongoose");

const messageListSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Room Id
  members: {
      type: [],
      required: true
  },
  messages: {
      type: [],
      required: true
  },
});

module.exports = mongoose.model("Message", messageListSchema);

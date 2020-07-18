const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
        },
    image: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Section', sectionSchema);
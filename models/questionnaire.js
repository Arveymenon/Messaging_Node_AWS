const mongoose = require('mongoose');

const questionnaireSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
        required: true
        },
    question: {
        type: String,
        required: true
        },
    image: {
        type: String
        }
});

module.exports = mongoose.model('Questionnaire', questionnaireSchema);
const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const QuizSchema = new Schema({
    question : {
        type: String,
    },
   options_a : {
        type : String,
        required : true
    },
    options_b : {
        type : String,
        required : true
    },
    options_c : {
        type : String,
        required : true
    },
    options_d : {
        type : String,
        required : true
    },
    correctAnswer : {
        type : String,
    },
    points : {
        type:Number,
        default: 0
    }
});

const Quiz = model("Quiz", QuizSchema)

module.exports = Quiz
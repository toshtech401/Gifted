const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserQuizSchema = new Schema({
    user : {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
   
    TotalAnswer : {
        type : Number,
        default: 0,
    },
    QuizPoints : {
        type:Number,
        default: 0
    }
})

const UserQuiz = model("UserQuiz", UserQuizSchema)

module.exports = UserQuiz
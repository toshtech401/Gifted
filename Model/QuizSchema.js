const mongoose = require("mongoose")

const quizSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctOption: Number,
  });
  
  const Quiz = mongoose.model('Quiz', quizSchema);
  
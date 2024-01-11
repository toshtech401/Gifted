const Question = require("../Model/Quiz")

const getQuiz = async(req, res)=>{
    try {
      // Fetch a random question from the database
      const randomQuestion = await Question.findOne().skip(Math.floor(Math.random() * await Question.countDocuments()));
  
      res.render('Quiz', { question: randomQuestion });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  const createQuiz = async(req, res)=>{
    try {
      const { question, options, correctOption } = req.body;
  
      // Convert options to an array
      const optionsArray = options.split(',');
  
      const newQuestion = new Question({
        question,
        options: optionsArray,
        correctOption: parseInt(correctOption, 10),
      });
  
      await newQuestion.save();
  
      res.redirect('/quiz/admin-post');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  const adminPostQuiz = async(req, res)=>{
    res.render("admin/create-quiz")
  };
  
  const submitQuiz = async(req, res)=>{
    try {
      const selectedOption = parseInt(req.body.answer, 10);
  
      // Retrieve the correct answer from the database based on the submitted question
      const randomQuestion = await Question.findOne().skip(Math.floor(Math.random() * await Question.countDocuments()));
      const correctOption = randomQuestion.correctOption;
  
      const isCorrect = selectedOption === correctOption;
  
      if (isCorrect) {
        res.send('Correct!');
      } else {
        res.send('Incorrect. Try again!');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  const getNewQuiz = async(req, res)=>{
  let currentQuestionId;
    try {
      // Fetch a random question ID from the database, excluding the current question ID
      const randomQuestion = await Question.findOne({ _id: { $ne: currentQuestionId } }).skip(Math.floor(Math.random() * await Question.countDocuments()));
      
      currentQuestionId = randomQuestion._id;
  
      return res.json({ question: randomQuestion.question, options: randomQuestion.options });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

module.exports = {
    getQuiz,
  createQuiz,
  submitQuiz,
  adminPostQuiz,
  getNewQuiz,
}
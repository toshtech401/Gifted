const Quiz = require("../Model/Quiz");
const UserModel = require("../Model/User");
const UserQuiz = require("../Model/UserQuizModel");

const createQuestion = async (req, res)=>{
    try {
        const {question, options_a, options_b, options_c, options_d, correctAnswer, points} = req.body;
        
        if(!question || !options_a || !options_b || !options_c || !options_d || correctAnswer || points){
            return res.status(400).json({error: "all is required"})
        } 
        const newQuestion = await Quiz.create(req.body)
        return res.redirect('/admin/create-quiz')
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
}



const getAllQuestion = async (req, res)=>{
    try {
        const questions = await Quiz.find();
        for(var i = 0; i < questions.length; i++){
            const id = questions[i]._id;
            const qst = await Quiz.findById({_id:id});
            return res.json({qst, amt:questions.length})
        }
        // const qst = questions.map(qst => qst.toObject())
        // return res.status(200).json(qst)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
}


const getQuestion = async (req, res)=>{
    try {
        const _id = req.params.id;
        const question = await Quiz.findOne(_id)

        if(!question){
            return res.status(404).json({msg: "Question not found"})
        }
        return res.status(200).json(question)

    } catch (error) {
       console.log(error) 
       return res.status(500).json({error: "Internal server error"})
    }
}


const answeredQuestion = async (req, res)=>{
    const user = req.user
    const {chosenOption} = req.body
    const {questionId} = req.params

    const avail_qst = await Quiz.findOne({_id:questionId});
    const userQuizPoints = await UserQuiz.findOne({user : user._id})
    if(!avail_qst) return res.json({error: "Question not available right now"})


    const p_on_correctAns = avail_qst.points;


    // Check if choosen answer is correct

    if(chosenOption === avail_qst.correctAnswer){
        userQuizPoints.QuizPoints += p_on_correctAns;
        await userQuizPoints.save();
        return res.json({msg: "Question answered successfully"})
    }

    userQuizPoints.QuizPoints += 0;
        await userQuizPoints.save();
        return res.json({msg: "Nothing much"})

}

const updateQuestion = async (req, res)=>{
    try {

        const {questionId} = req.params;
        const questionInput = req.body;

        const updatedQuiz = await Quiz.findByIdAndUpdate(
            questionId,
            questionInput,
            {new:true, runValidators:true}
        );

        if(!updatedQuiz){
            return res.status(404).json({msg: "Question not found"})
        }

        return res.status(200).json(updatedQuiz)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
}


const deleteQuestion = async (req, res)=>{
    try {
        const _id = req.params.id;
        const question = await Quiz.deleteOne({_id})

        if(!question){
            return res.status(404).json({msg: "Question not found"})
        }
        return res.status(201).json({msg: "question deleted successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
}


module.exports = {createQuestion, getAllQuestion, getQuestion, updateQuestion, deleteQuestion, answeredQuestion}
const Quiz = require("../Model/Quiz.");
const UserModel = require("../Model/User");

const createQuestion = async (req, res)=>{
    try {
        const {question, options_a, options_b, options_c, options_d, correctAnswer, points} = req.body;
        
        // if(!question || !options_a || !options_b || !options_c || !options_d || correctAnswer || points){
        //     return res.status(400).json({error: "all is required"})
        // } 
        const newQuestion = await Quiz.create(req.body)
        return res.status(201).json(newQuestion)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
}



const getAllQuestion = async (req, res)=>{
    try {
        const questions = await Quiz.find()
        return res.status(200).json(questions)
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
    const {id} = req.params;
    const {chosenOption} = req.body
    const avail_qst = await Quiz.findOne({_id:id});
    const p_on_correctAns = avail_qst.points;
    if(!avail_qst) return res.json({error: "Question not available right now"})

    // Check if choosen answer is correct

    if(avail_qst.correctAnswer === chosenOption){
        user.cp = p_on_correctAns;
        await UserModel.save();
        return res.json({msg: "Question answered successfully"})
    }


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
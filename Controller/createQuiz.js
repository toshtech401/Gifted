const createQuiz = (req, res) => {
    const { question, options, correctOption } = req.body;

    const newQuiz = new Quiz({
        question,
        options: options.split('\n'),
        correctOption: parseInt(correctOption),
    });

    newQuiz.save((err) => {
        if (err) {
        console.error(err);
        res.send('Error saving the quiz.');
        } else {
        res.redirect('/admin/create-quiz');
        }
    });
};

const getQuiz = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.render('quiz', { quizzes });
    } catch (err) {
        console.error(err);
        res.send('Error fetching quizzes.');
    }
};

const submitQuiz = (req, res) => {
    const userAnswers = Object.keys(req.body).map(key => parseInt(req.body[key]));
    const correctOptions = req.body.correctOption.split(',').map(option => parseInt(option));

    const score = userAnswers.reduce((totalScore, userAnswer, index) => {
        return totalScore + (userAnswer === correctOptions[index] ? 15 : 0);
    }, 0);

    res.send(`Your score: ${score}`)
};

  
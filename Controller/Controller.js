const home = (req, res)=>{
    res.render('home')
}


const signUp = (req, res)=>{
    res.render('SignUp')
}

const signIn = (req, res)=>{
    res.render('Signin')
}

const dashboard = (req, res)=>{
    res.render('Dashboard')
}

const coursePage = (req, res)=>{
    res.render('Coursepage')
}

const leaderBoard = (req, res)=>{
    res.render('LeaderBoard')
}

const quizPage = (req, res) =>{
    res.render('Quizpage')
}

const quizSelection = (req, res) =>{
    res.render('Quizselection')
}

const settings = (req, res) =>{
    res.render('Settings')
}
const spinWheel = (req, res) =>{
    res.render('SpintheWheel')
}
module.exports = {
    home,
    signUp, 
    signIn,
    dashboard,
    coursePage,
    leaderBoard,
    quizPage,
    quizSelection,
    settings,
    spinWheel
}
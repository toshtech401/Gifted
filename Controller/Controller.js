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

<<<<<<< HEAD
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
=======
const gethelp = (req, res)=>{
    res.render('GetHelp')
}

const getsupport =(req,res)=>{
    res.render("GetSupport")
}

const congratulation =(req, res)=>{
    res.render('Congratulations')
}

const payment = (req, res)=>{
    res.render('Payment')
}

const planpage = (req, res)=>{
    res.render('Planpage')
}

const referral = (req,res)=>{
    res.render("Referrals")
}

const spin = (req, res)=>{
    res.render('SpinAndWin')
}

>>>>>>> 108c06db24a3520596fa46b512ff4fb87b73a423
module.exports = {
    home,
    signUp, 
    signIn,
    dashboard,
<<<<<<< HEAD
    coursePage,
    leaderBoard,
    quizPage,
    quizSelection,
    settings,
    spinWheel
=======
    gethelp,
    getsupport,
    congratulation,
    payment,
    planpage,
    referral,
    spin
>>>>>>> 108c06db24a3520596fa46b512ff4fb87b73a423
}
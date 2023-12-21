const Points = require("../Model/Points")
const Wallet = require("../Model/Wallet")
const referralModel = require("../Model/referral")

const home = (req, res)=>{
    res.render('home')
}


const signUp = (req, res)=>{
    res.render('SignUp')
}

const signIn = (req, res)=>{
    res.render('Signin')
}

const dashboard = async(req, res)=>{

    try {
        const user = req.user;

        if (!user) {
            return res.status(404).json({ error: "You are not authorized!" });
        }


        const userPoints = await Points.findOne({user: user._id})
        const userWallet = await Wallet.findOne({user: user._id})
        const referrals = await referralModel.findOne({user: user._id})

        const totalEarnings = userWallet?.current_balance;
        const totalPoints = userPoints?.points
        const referralCommission = referrals?.referralCommission

        const userData = {
            totalEarnings,
            totalPoints,
            referralCommission,
            name: user.username
        };

         console.log({userData });
        
        return res.render('Dashboard', {userData })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
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

const setting = (req, res) =>{
    res.render('Settings')
}
const spinWheel = (req, res) =>{
    res.render('SpintheWheel')
}
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
const createQuiz = (req, res)=>{
    res.render('createQuiz')
}
const makePayment= (req, res)=>{
    res.render('pay')
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
    setting,
    spinWheel,
    gethelp,
    getsupport,
    congratulation,
    payment,
    planpage,
    referral,
    spin,
    createQuiz,
    makePayment
}
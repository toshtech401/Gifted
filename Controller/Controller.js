const Points = require("../Model/Points")
const UserModel = require("../Model/User")
const Wallet = require("../Model/Wallet")
const referralModel = require("../Model/referral");

const SECRET_KEY = process.env.SECRET_KEY

require('dotenv').config()

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


        const userPoints = await Points.findOne({user: user})
        const userWallet = await Wallet.findOne({user: user})
        const referrals = await referralModel.findOne({user})

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
    const user = req.user;
    const id = user._id
    res.render('Settings', {id, user})
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
    res.render('Create-Quiz')
}

const withdraw = async(req, res)=>{

    const allBanks = await fetch("https://api.paystack.co/bank", {
        method:"GET",
        headers: {
            Authorization: `Bearer ${SECRET_KEY}`
          }
    }).then(res => res.json())

    if(allBanks.status === false) return res.status(422).json("Error while fetching banks, pls try again")


    const banks = allBanks.data
    return res.render('Withdraw', {banks})
}
const makePayment= (req, res)=>{
    let amount_to_pay;
    const user = req.user
    const planType = user.plan_type;
    const email = user.email

    if(planType === 'weekly'){
        amount_to_pay = 2400
    }else(amount_to_pay = 4600)
    res.render('pay', {amount_to_pay, email})
}

const confirmPayment = async(req, res)=>{
    const {reference, email} = req.body;
    if(!reference){
        return res.redirect('/makePayment')
    }

    const baseurl = 'https://api.paystack.co/transaction/verify/' + reference;

    const response = await fetch(baseurl, {
        headers:{
            Authorization: `Bearer ${process.env.SECRET_KEY}`
        }
    })
        .then(response => response.json())


    if(response.status === true){
       const user = req.user
       const referredUser = user.referredBy
       if(!user) return console.log("no user with " + email);
       user.isPaid = true;

       if(!referredUser){
        await user.save()
       }
       const referrer = await referralModel.findById({user: referredUser})
       console.log("referral: ", referrer);
       referrer.referralCommission += 1000;
       await referrer.save()
       await user.save()

    }
    

}

const sidebar = (req, res)=>{
    res.render("Sidebar")
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
    makePayment,
    confirmPayment,
    sidebar,
    withdraw
}
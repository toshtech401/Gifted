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

module.exports = {
    home,
    signUp, 
    signIn,
    dashboard,
    gethelp,
    getsupport,
    congratulation,
    payment,
    planpage,
    referral,
    spin
}
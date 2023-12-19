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

module.exports = {
    home,
    signUp, 
    signIn,
    dashboard
}
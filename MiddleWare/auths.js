const isLoggedin = async(req, res, next)=>{
    if(req.isAuthenticated()) return next()
    return res.json({error: "Login sesion expired, Kindly re-login to continue"})
}
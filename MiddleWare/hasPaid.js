const hasPaid = async(req, res, next) =>{
    if(req.user.isPaid === true){
        return next()
    }
    return res.redirect("/makePayment")
}


module.exports = hasPaid
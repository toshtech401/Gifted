


const userDashboard = async(req, res) => {
    const user = req.user
    const totalPoints = await Points.find()
    const totalEarnings = await Earnings.find()
    const referrals = await Referrals.find()


    const userData = {
        totalEarnings,
        totalPoints,
        referrals
    }

    if(!user) throw new Error("User Not Found!!")
    return res.json({data: userData})
}



module.exports = {userDashboard}
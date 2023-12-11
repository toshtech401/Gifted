


const userDashboard = async(req, res) => {
    const user = req.user

    if(!user) throw new Error("User Not Found!!")
}



module.exports = {userDashboard}
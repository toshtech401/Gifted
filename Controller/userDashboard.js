
const userDashboard = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(404).json({ error: "User Not Found!" });
        }


        const totalPoints = await Points.find();
        const totalEarnings = await Earnings.find();
        const referrals = await Referrals.find();

        const userData = {
            totalEarnings,
            totalPoints,
            referrals,
        };

        return res.json({ data: userData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    userDashboard 
};

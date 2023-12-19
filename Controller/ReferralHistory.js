const UserModel = require("../Model/User");

const getAllQuizParticipants = async (req, res) => {
    try {
        const participants = await UserModel.find();

        if (!participants) {
            return res.status(404).json({ msg: "No participants found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {
    getAllQuizParticipants
}

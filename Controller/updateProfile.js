const ProfileModel = require("../Model/Profile")
const updateProfile = async(req, res) =>{
   
    try {
        const {profileId} = req.params;
        const updateProfile = req.body

        const updatedProfile = await ProfileModel.findByIdAndUpdate(
            profileId,
            updateProfile,
            {new: true, runValidators: true}
        )
        if(!updatedProfile){
            return res.status(404).json({error: "Profile Not Found", success: false})
        }
        return res.json({message: "Profile Updated", ProfileModel: updatedProfile, success: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Server Error", success:  false})
    }
}

module.exports = {
    updateProfile
}
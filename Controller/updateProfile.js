const UserModel = require("../Model/User")

const updateProfile = async(req, res) =>{
    try {
        const profileId = req.params.id;
        const {username, email} = req.body


        console.log(profileId)
        console.log(req.body)

        const existingProfile = await UserModel.findById({_id:profileId});

        if (!existingProfile) {
            return res.status(404).json({ error: "Profile Not Found", success: false });
        }

        existingProfile.username = username;
        existingProfile.email = email;
        existingProfile
        .save()
        .then()
        .catch((error)=>{
            next(error);
        });
        
        return res.redirect('/settings')
    } catch (error) {
        console.log(error)
        return res.status(500).json({error, success:  false})
    }
 }
 

// const updateProfile = async(req, res) =>{
//    try {
//         const profileId = req.params.id;
//         const {username, email} = req.body


//         console.log(profileId)
//         console.log(req.body)

//         const existingProfile = await UserModel.findById({_id:profileId});

//         if (!existingProfile) {
//             return res.status(404).json({ error: "Profile Not Found", success: false });
//         }

//         const updatedProfile = await UserModel.findOneAndUpdate(
//             {_id:profileId},
//             { $set: { username, email } },
//             { new: true, runValidators: true }
//         );
        
//         if(!updatedProfile){
//             return res.status(404).json({error: "Profile Not Found", success: false})
//         }
//         return res.redirect('/settings')
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({error: "Server Error", success:  false})
//     }
// }

module.exports = {
    updateProfile
}
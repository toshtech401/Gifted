const mongoose = require("mongoose")
const {Schema, model} = mongoose

const ProfileSchema = new Schema({
    username : {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    email : {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
})


const ProfileModel = model("Profile", ProfileSchema)
module.exports = ProfileModel
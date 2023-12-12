const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const passportLocalMongoose = require('passport-local-mongoose')
const {Schema, model} = mongoose
const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    planType:{
        type:String,
        enum:["Weekly", "Monthly"],
        required:true
    },
    weeklyPlan:{
        type:Object,
        default:{}
    },
    monthly:{
        type:Object,
        default:{}
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})


userSchema.plugin(passportLocalMongoose)

const UserModel = model("User", userSchema)

passport.use(UserModel.createStrategy())

passport.serializeUser(UserModel.serializeUser())

passport.deserializeUser(UserModel.deserializeUser())

module.exports = UserModel;
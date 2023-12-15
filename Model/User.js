const mongoose = require('mongoose')
const passport = require('passport')
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
    confirmPassword:{
        type:String,
        required:true
    },
    cp: {
        type:Number,
        default:0
    },
    course_access_point:{
        type:Number,
        default:0
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    next_PaymentDate:{
        type:Date
    }
})


userSchema.plugin(passportLocalMongoose)

const UserModel = model("User", userSchema)

passport.use(UserModel.createStrategy())

passport.serializeUser(UserModel.serializeUser())

passport.deserializeUser(UserModel.deserializeUser())

module.exports = UserModel;
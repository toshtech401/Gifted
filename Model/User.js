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
    isAdmin:{
        type:Boolean,
        default:false
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    has_spin:{
        type:Boolean,
        default:false
    },
    referralCode:{
        type:String
    },
    next_PaymentDate:{
        type:Date
    },
    referredBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Referral'
    },
    plan_type:{
        type:String,
        required:true,
        enum:['weekly','monthly']
    
    }
})


userSchema.plugin(passportLocalMongoose)

const UserModel = model("User", userSchema)

passport.use(UserModel.createStrategy())

passport.serializeUser(UserModel.serializeUser())

passport.deserializeUser(UserModel.deserializeUser())

module.exports = UserModel;
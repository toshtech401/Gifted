const mongoose = require('mongoose')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const {Schema, model} = mongoose

const referralSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  referralCode: String,
  referredUsers: [{ type: String }],
  referralCommission: { 
    type: Number, 
    default: 10
  },
  status:{
    type:String,
    enum:['pending', 'completed']
  }
  }
  );


const referralModel = model('Referral', referralSchema)
module.exports = referralModel;
const mongoose = require('mongoose')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const {Schema, model} = mongoose

const referralSchema = new mongoose.Schema({
  referedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    referred: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    referralCommission:{
        type:Number,
        default:0
    },
    paymentMade: Boolean,
  },
  {timestamps:true}
  );


const referralModel = model('Referral', referralSchema)
module.exports = referralModel;
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const {Schema, model} = mongoose;
const planSchema = new Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId
    },
    user:{
        type: String,
        require:true
    },
    plan_type:{
        type:String,
        enum:["weekly", "monthly"]
    },
    price:{
        type:Number
    }
},
{timestamps:true}
)

const planModel = model('Plan', planSchema)
module.exports = planModel;
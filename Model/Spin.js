const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const SpinSchema = new Schema({
    spin : {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
},
    {timestamps:true}
);


const Spin = model('Spin', SpinSchema);

module.exports = Spin
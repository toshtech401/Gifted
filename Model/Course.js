const mongoose = require("mongoose")
const {Schema, model} =  mongoose



const courseSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required:true
    },
    courseImage: {
        type: String,
        required:true
    }
})

const Course = model("Course", courseSchema);

module.exports = Course
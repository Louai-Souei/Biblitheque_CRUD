const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    ref: {
        type:String,
        required: true,
        unique: true, 
    },
    title: {
        type:String,
        required: true
    },
    author: {
        type:String,
        required: true
    },
    publicationYear:{
        type:Number,
        required: true
    },
    NumberOfPages:{
        type:Number,
        required: true
    },
    description: {
        type:String,
        required: true
    },
}) 

module.exports= mongoose.model("Book", bookSchema)

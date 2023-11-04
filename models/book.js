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
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
    },
    category:[{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],
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

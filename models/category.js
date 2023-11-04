const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    title: {
        required: true,
        type:String,
        enum: ["Horror", "Mystrey", "Drama", "Adventure", "Sci-Fi", "Comedy", "Romantic"]
    },

}) 

module.exports= mongoose.model('Category', categorySchema)
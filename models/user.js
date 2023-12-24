const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    
    firstname:{type:String,require:true},
    lastname:{type:String,require:true},
    role : { type : String , enum : ['admin' , 'user'] , default : 'user'},

    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},

})
module.exports=mongoose.model("user",userSchema)
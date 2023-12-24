const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const user = require("../models/user")



///////////////////////**//////////////////////////////////////////////// */

exports.sendNotification = async (req, res) => {
    console.log("")
}


///////////////////////**//////////////////////////////////////////////// */
exports.signup = (req,res,next) => {
    bcrypt 
    .hash(req.body.password, 10)
    .then((hash) =>{
        const user = new User ({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            role : req.body.role,
            email: req.body.email,
            password : hash,
        })
        user 
        .save()
        .then ((response) =>{
            const newUser= response.toObject()
            delete newUser.password
            res.status(201).json ({
                user: newUser,
                message: 'user created !',

            })
        })
        .catch ((error) => res.status(400).json ({ error : error.message}))
    })
.catch ((error)=> res.status(500).json({error}))
}

exports.login = (req, res, next) => {

    user.findOne({email:req.body.email})
    .then((user)=>{
        console.log("rr")
        if(!user){
            return res 
            .status(401)
            .json({message:"login ou pass incorrect"})
        }
        bcrypt.compare(req.body.password,user.password)
        .then((valid)=>{
            if(!valid){
                return res.status(401)
                .json({message:"login ou MP inco"})
            }
            res.status(200).json({
                token:jwt.sign({userId:user._id, userRole:user.role},"RANDOM TOKEN",{
                    expiresIn:"24h",
                }),
                userId:user._id
            })
        })
    }).catch((error)=> res.status(500).json({error:error}))

}
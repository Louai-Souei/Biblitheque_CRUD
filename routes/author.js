const express = require('express');
const router=express.Router();
const Author=require("../models/author");
const AuthorController=require("../controllers/authorController");


router.post('',AuthorController.AddAuthor);


module.exports=router
const express = require('express');
const router=express.Router();
const Category=require("../models/category");

const CategoryController=require("../controllers/categoryController");

router.post('',CategoryController.AddCategory);


module.exports=router
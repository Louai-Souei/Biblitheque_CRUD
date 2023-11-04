const express = require('express');
const router=express.Router();
const Book=require("../models/book");
const BookController=require("../controllers/bookController");

router.get("",BookController.getBooks);

router.post('',BookController.AddBook);

router.patch("/:ref",BookController.EditBook);

router.get("/:ref",BookController.getBookByRef);

router.delete("/:ref", BookController.DeleteBook);


module.exports=router
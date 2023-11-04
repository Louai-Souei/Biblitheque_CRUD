const express = require('express');
const router=express.Router();

const Author = require("../models/author")
  
  const AddAuthor = (req, res) => {
    console.log(req.body);
    const author = new Author(req.body);
    author
      .save()
      .then(() =>
        res.status(201).json({
          model: author,
          message: "Auteur ajouté !",
        })
      )
      .catch((error) =>
        res.status(400).json({
          error: error.message,
          message: "Données invalides",
        })
      );
  };

  module.exports={
    AddAuthor:AddAuthor,
 }
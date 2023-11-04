const express = require('express');
const router=express.Router();

const Category = require("../models/category")
  
  const AddCategory = (req, res) => {
    console.log(req.body);
    const category = new Category(req.body);
    category
      .save()
      .then(() =>
        res.status(201).json({
          model: category,
          message: "Catégorie ajoutée !",
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
    AddCategory:AddCategory,
 }
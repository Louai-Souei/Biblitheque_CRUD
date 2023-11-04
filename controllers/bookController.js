const express = require('express');
const router=express.Router();

const Book = require("../models/book")

const getBooks = (req, res) => {
    Book.find()
    .populate('author')
    .populate('category')
      .then((books) =>
        res.status(200).json({
          model: books,
          message: "success",
        })
      )
      .catch((error) =>
        res.status(400).json({
          error: error.message,
          message: "probleme d'extraction",
        })
      );
  };

  const getBookByRef = (req, res) => {
  
    Book.findOne({ ref: req.params.ref })
      .then((book) => {
        if (!book) {
          res.status(404).json({
            message: "Livre non trouvé",
          });
        } else {
          res.status(200).json({
            model: book,
            essage: "Livre trouvé",
          });
        }
      })
      .catch((error) =>
        res.status(400).json({
          error: error.message,
          message: "Données invalides",
        })
      );
  };

  const AddBook = (req, res) => {
    console.log(req.body);
    const book = new Book(req.body);
    book
      .save()
      .then(() =>
        res.status(201).json({
          model: book,
          message: "Livre ajouté !",
        })
      )
      .catch((error) =>
        res.status(400).json({
          error: error.message,
          message: "Données invalides",
        })
      );
  };
  
const EditBook = (req, res) => {
    Book.findOneAndUpdate({ ref : req.params.ref }, req.body, { new: true })
      .then((book) => {
        if (!book) {
          res.status(404).json({
            message: "Livre non trouvé",
          });
        } else {
          res.status(200).json({
            model: book,
            message: "Information(s) du livre bien modifiée(s)",
          });
        }
      })
      .catch((error) =>
        res.status(400).json({
          error: error.message,
          message: "Données invalides",
        })
      );
  };

const DeleteBook = (req, res) => {
  
    Book.deleteOne({ ref: req.params.ref })
      .then(() => res.status(200).json({ message: "Livre supprimé" }))
      .catch((error) => res.status(400).json({ error }));
  };

  module.exports={
    getBooks:getBooks,
    AddBook:AddBook,
    EditBook:EditBook,
    DeleteBook:DeleteBook,
    getBookByRef:getBookByRef

 }
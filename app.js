const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Book = require("./models/book");
mongoose
  .connect(
    "mongodb://localhost:27017/bibliotheque",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à mongoDB reussite"))
  .catch((e) => console.log("connexion à mongodb échouée", e));

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Acces-Control-Allow-Origin", "*");
  res.setHeader(
    "Acces-Control-Allow-Header",
    "Origin, X-Requested-With, Content, Accept, Content-Type ,Authorization"
  );
  res.setHeader(
    "Acces-Control-Allow-Methods",
    "GET, POST, PUT , DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/api/books/", (req, res) => {
  Book.find()
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
});
app.get("/api/books/:ref", (req, res) => {

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
});
app.post("/api/books/", (req, res) => {
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
});

app.patch("/api/books/:ref", (req, res) => {
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
});
app.delete("/api/books/:ref", (req, res) => {

  Book.deleteOne({ ref: req.params.ref })
    .then(() => res.status(200).json({ message: "Livre supprimé" }))
    .catch((error) => res.status(400).json({ error }));
});
module.exports = app;
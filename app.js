const express = require("express");
const app = express();
const mongoose = require("mongoose");
const BookRoutes = require("./routes/book")
const AuthorRoutes = require("./routes/author")
const CategoryRoutes = require("./routes/category")



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


app.use("/books",BookRoutes)
app.use("/authors",AuthorRoutes)
app.use("/category",CategoryRoutes)


module.exports = app;
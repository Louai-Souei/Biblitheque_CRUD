const express = require("express");
const app = express();
const http = require("http")
const port =process.env.PORT || 5000
//const socketIO = require('socket.io');
const server = http.createServer(app)
//const socketIo = require("socket.io");
//const io = socketIo(server);

const mongoose = require("mongoose");
const BookRoutes = require("./routes/book")
const AuthorRoutes = require("./routes/author")
const CategoryRoutes = require("./routes/category")
const UserRoutes = require("./routes/user")
/*

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  // Événement 'setSocketId' écouté ici
  socket.on('setSocketId_1', (userId) => {
    console.log(`Received setSocketId event for user ID: ${userId}`);
    // Votre logique pour gérer cet événement
    // Ici, vous pouvez mettre en place votre logique pour émettre des événements à un utilisateur spécifique
  });
});*/




//  const io = socketIO(server);


app.set("port", port)



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/test.html');
});

server.listen(port,()=>{
  console.log("Listening on "+ port)
})

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
app.use("", UserRoutes)


module.exports = {app, server} ;
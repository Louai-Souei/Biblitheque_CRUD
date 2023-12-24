const {server}  = require("./app")
const user = require("./models/user")

const {app}  = require("./app")
/*const io = require("socket.io")(8080,{
  cors: {
    origin: "http://localhost:5000",
  },
});*/

const { Server } = require("socket.io");
const io = new Server(server);


let userSocketMap= new Map()

io.on('connection', function(socket)  {
  console.log('a user connected');
  //console.log(socket.id);


  socket.on("setSocketId_1", (userId) => {
    console.log("louaiii : ", userId)
   });

  socket.on("setSocketId", (userId) => {

    userSocketMap.set(userId,socket.id)
    console.log(`User with ID ${userId} connected with socketId: ${socket.id}`);
    console.log(`------------------------------------------------------------`);
    console.log(userSocketMap);
    for (const key of userSocketMap.keys()) {
      console.log(key,"son SocketId est : ", userSocketMap.get(key));
    }

    user.findOne({_id:userId})
    .then((user)=>{
      console.log(user)
      if (user.role == "admin"){
      io.to(userSocketMap.get(userId)).emit('news',userSocketMap.get(userId))
  }})


    
    
    
  });
});

io.on('disconnect', (socket) => {
  console.log('a user disconnected');
});


module.exports = {userSocketMap};

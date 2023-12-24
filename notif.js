
const io = require('socket.io');

// Fonction pour envoyer une notification à un utilisateur spécifique
function sendNotificationToUser(userId, message) {
const socketIdToNotify = userSocketMap[userId];
if (socketIdToNotify) {
    io.to(socketIdToNotify).emit('notification', message);
  }
}

module.exports = {
  sendNotificationToUser,
};
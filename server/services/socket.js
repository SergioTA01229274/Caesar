
async function initializeSocket(httpServer){
    const io = require('socket.io')(httpServer, {
        cors: {
            origin: "http://localhost:8080"
        }
    });
    io.on("connection", (socket) => {
        socket.on("ClientPing", (message) => {
            console.log(message);
        });
        socket.on("disconnect", () => {
            console.log("User disconnected !");
        });
    });

    return io;
}

module.exports.initializeSocket = initializeSocket;

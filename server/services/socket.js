
module.exports = function (httpServer) {
    tmpIO = require('socket.io')(httpServer, {
        cors: {
            origin: "http://localhost:8080",
            methods: ["GET", "POST"]
        }
    });
    tmpIO.on('connection', (socket) => {
        console.log(socket);
    });
    tmpIO.on('PING', (socket) => {
        console.log(socket);
    });
    return tmpIO;
};
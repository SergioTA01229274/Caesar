let userConns = {};

async function initializeSocket(httpServer){
    const io = require('socket.io')(httpServer, {
        cors: {
            origin: "http://localhost:8080"
        }
    });
    io.on("connection", (socket) => {
        socket.on("addUserConn", (usrObj) => {
            userConns[usrObj.username] = {userContacts: usrObj.contacts, userSockID: socket.id, userSock: socket};
        });

        socket.on("srvMsg", (msgObj) => {
            if(userConns[msgObj.receiver]){
                userConns[msgObj.receiver].userSock.emit("clntMsg", {msg: `${msgObj.msg}`, sender: msgObj.sender, receiver: msgObj.receiver});
            }else{
                userConns[msgObj.sender].userSock.emit("errMsg", {msg: `${msgObj.receiver} offline. Couldn't send: ${msgObj.msg}`, sender: msgObj.sender, receiver: msgObj.sender});
            }
        });

        socket.on("disconnect", () => {
            let tmpKey = '';
            for(var key in userConns){
                if(String(userConns[key].userSockID) == String(socket.id)){
                    tmpKey = key;
                    break;
                }
            }
            delete userConns[tmpKey];
        });
    });
    return io;
}

module.exports.initializeSocket = initializeSocket;
module.exports.userConns = userConns;

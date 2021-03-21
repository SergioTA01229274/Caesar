let userConns = new Map();

async function initializeSocket(httpServer){
    const io = require('socket.io')(httpServer, {
        cors: {
            origin: "http://localhost:8080"
        }
    });
    io.on("connection", (socket) => {
        socket.on("addUserConn", (usrObj) => {
            userConns.set(usrObj.username, {userContacts: usrObj.contacts, userSockID: socket.id, userSock: socket});
            console.log(userConns.keys());
        });

        socket.on("disconnect", () => {
            let tmpKey = '';
            for(let key in userConns.keys()){
                if(String(userConns[key].userSockID) == String(socket.id)){
                    tmpKey = key;
                    break;
                }
            }
            userConns.delete(tmpKey);
            console.log(userConns.keys());
        });
    });



    return io;
}

module.exports.initializeSocket = initializeSocket;
module.exports.userConns = userConns;

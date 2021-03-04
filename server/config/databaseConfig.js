module.exports = {
    firebaseConfig : {
        apiKey: process.env.API_KEY,
        authDomain: "ceaser-chat.firebaseapp.com",
        databaseURL: "https://ceaser-chat-default-rtdb.firebaseio.com",
        projectId: "ceaser-chat",
        storageBucket: "ceaser-chat.appspot.com",
        messagingSenderId: process.env.MESSAGING_SENDERID,
        appId: process.env.APPID,
        measurementId: "G-T2GP5ML24V"
    }
}

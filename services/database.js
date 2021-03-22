const serviceAccount = require('../config/serviceAccountKey.json');
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ceaser-chat-default-rtdb.firebaseio.com"
});
const database = admin.firestore();

module.exports.database = database;
//module.exports.close = close;
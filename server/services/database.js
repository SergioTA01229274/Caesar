const firebaseConfig = require('../config/databaseConfig');
const firebase = require("firebase-admin");
require("firebase/firestore");

// Initialize Firebase
async function initialize(){
    await firebase.initializeApp(firebaseConfig);
    return firebase.firestore();
}

//Implement close method
//Implement query executor

module.exports.initialize = initialize;

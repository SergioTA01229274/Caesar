// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/firestore";

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
    apiKey: "AIzaSyDRT8wL656gXCg2Eltmc0qvRKqOwuttKlk",
    authDomain: "ceaser-chat.firebaseapp.com",
    databaseURL: "https://ceaser-chat-default-rtdb.firebaseio.com",
    projectId: "ceaser-chat",
    storageBucket: "ceaser-chat.appspot.com",
    messagingSenderId: "204245971346",
    appId: "1:204245971346:web:2641cf52beee99daacd14b",
    measurementId: "G-T2GP5ML24V"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const users = db.collection("users");

await users.doc('mr_green').set({
    contacts: ['mr_blue', 'morpheo', 'neo'],
    last_connection: '1 de marzo de 2021, 12:00:00 UTC-6',
    login_key: 'sasdjhkasjhdaksjhd2',
    password: 'SDKSJAHFKSJHDKS2',
    public_key: 'KLDJFLKDJFLKDJSFLK2',
    registration_date: '28 de febrero de 2021, 12:00:00 PM'
})

const usersRef = db.collection('users');
console.log(usersRef);
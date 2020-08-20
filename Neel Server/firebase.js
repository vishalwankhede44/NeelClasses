var firebase = require('firebase');    
const firebaseConfig = {
    apiKey: "AIzaSyB2CxayEiuRUeXTMiarHFG0F0ROFK8CBvI",
    authDomain: "neelclasses-8e371.firebaseapp.com",
    databaseURL: "https://neelclasses-8e371.firebaseio.com",
    projectId: "neelclasses-8e371",
    storageBucket: "neelclasses-8e371.appspot.com",
    messagingSenderId: "725363085907",
    appId: "1:725363085907:web:e2d474c0a75f2a8a6a2ca6"
  };
firebase.initializeApp(firebaseConfig);
module.exports = firebase;
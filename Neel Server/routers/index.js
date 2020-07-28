const express = require('express');
const indexRouter = express.Router();

//Firebase Import
const firebase = require("firebase");


// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyB2CxayEiuRUeXTMiarHFG0F0ROFK8CBvI',
  authDomain: 'neelclasses-8e371.firebaseapp.com',
  projectId: 'neelclasses-8e371'
});


indexRouter.get('/',(req,res) => {

  var db = firebase.firestore();
  var docRef = db.collection("Users");
  var queryRef = docRef.where("first","==","firstname").get().then(function(doc){
    if(doc.empty){
      console.log("NOT PRESENT");
    }
    else{
      console.log("PRESENT");
      doc.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      });
    }
  });

     
  //  docRef.set({
  //   'first':'FIRSTNAME',
  //   'middle':'MIDDLENAME',
  //   'last':'LASTNAME',
  //   'born':'YEAR'
  // });

  
  // docRef.get().then(function(doc) {
  //     if (doc.exists) {
  //         console.log("Document data:", doc.data());
  //     } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //     }
  // }).catch(function(error) {
  //     console.log("Error getting document:", error);
  // });
  res.render('index',{ title : "Piyush"});
});


module.exports = indexRouter;
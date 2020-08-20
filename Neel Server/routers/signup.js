const express = require('express');
const signUpRouter = express.Router();

//Firebase Import
const firebase = require("firebase");
require("firebase/firestore");

signUpRouter.post('/',(req,res) => {

    const signUpDetails = {
        name: req.body.name,
        mobile: req.body.mobile,
      };

      console.log(signUpDetails);
    var db = firebase.firestore();
    var docRef = db.collection("Users");
    var queryRef = docRef.where("mobile","==",signUpDetails.mobile).get().then(function(doc){
      if(doc.empty){        
        // docRef.doc().set({
        //     'name':signUpDetails.name,
        //     'mobile':signUpDetails.mobile
        // })
        res.send("Done");
      }
      else{
        console.log("PRESENT");
        res.send("EXIST");
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
    
  });
  
  
  module.exports = signUpRouter;
const express = require('express');
const addUserRouter = express.Router();

//Firebase Import
const firebase = require("firebase");
require("firebase/firestore");

addUserRouter.post('/',(req,res) => {

    const signUpDetails = {
        name: req.body.name,
        mobile: req.body.mobile,
      };

      console.log(signUpDetails);
    var db = firebase.firestore();
    var docRef = db.collection("Users");
    var queryRef = docRef.where("mobile","==",signUpDetails.mobile).get().then(function(doc){
      if(doc.empty){        
        docRef.doc().set({
            'name':signUpDetails.name,
            'mobile':signUpDetails.mobile
        })
        res.send("Done");
      }
      else{
        console.log("PRESENT");
        doc.forEach(doc => {
          res.send(doc.data);
        });
      }
    });
  
       
    
    
  });
  
  
  module.exports = addUserRouter;
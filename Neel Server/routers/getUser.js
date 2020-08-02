const express = require('express');
const getUserRouter = express.Router();

//Firebase Import
const firebase = require("firebase");
require("firebase/firestore");

getUserRouter.post('/',async (req,res) => {

    const logDetails = {
        mobile: req.body.mobile,
      };

      console.log(logDetails);
    var db = firebase.firestore();
    var docRef = db.collection("Users");
    var userdata = [];
    var queryRef =await docRef.where("mobile","==",logDetails.mobile).get();
      if(queryRef.empty){        
            
        console.log("NOT FOUND");
      }
      else{
        console.log("FOUND");
     
        queryRef.forEach(doc => {

            const userInfo = {
                name: doc.data().name,
                mobile:doc.data().mobile
            }
            userdata.push(userInfo);
          });

          console.log(userdata);
          
        
        res.send(userdata);
        // res.send("EXIST");
      }  
       
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
  
  
  module.exports = getUserRouter;
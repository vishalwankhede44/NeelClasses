const express = require('express');
const router = express.Router();
const firebase = require("firebase");

// firebase.auth().useDeviceLanguage();


// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');


//   var phoneNumber = "+917972117756";
//   var appVerifier = window.recaptchaVerifier;
//   firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
//       .then(function (confirmationResult) {
//         // SMS sent. Prompt user to type the code from the message, then sign the
//         // user in with confirmationResult.confirm(code).
//         console.log("SMS SENT");
//         window.confirmationResult = confirmationResult;
//       }).catch(function (error) {
//         // Error; SMS not sent
//         console.log("SMS NOT SENT");
//       });
//       res.render('index',{ title : "IN AUTH"});
//     });
let details = [];
router.post('/', function(req, res) {
    const newUser = {
      email: req.body.email,
      pass: req.body.password,
    };

    
  
    details.push(newUser);
    console.log(details);
  });

    module.exports = router;
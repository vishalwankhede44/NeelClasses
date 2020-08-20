const checksum_lib = require("../paytm/checksum/checksum");
const express = require("express");
const https = require("https");
const payment = express.Router();
const PaytmChecksum = require("../paytm/checksum/PaytmChecksum");

payment.get("/", (req, res) => {
  console.log("IN PAYTM");
  let params = {};
  (params["MID"] = "ZKBVLi06192328204943"),
    (params["WEBSITE"] = "WEBSTAGING"),
    (params["CHANNEL_ID"] = "WEB"),
    (params["INDUSTRY_TYPE_ID"] = "Retail"),
    (params["ORDER_ID"] = req.query.orderId),
    (params["CUST_ID"] = "CUST0011"),
    (params["TXN_AMOUNT"] = req.query.amount),
    (params["CALLBACK_URL"] = "https://neelclasses.com/callback"),
    (params["EMAIL"] = req.query.email),
    (params["MOBILE_NO"] = req.query.phonenumber);
  checksum_lib.genchecksum(params, "aZMUiL7OM%nvw@JN", function (
    err,
    checksum
  ) {
    console.log("checksum", checksum);
    var paytmParams = {
      ...params,
      CHECKSUMHASH: checksum,
    };

    res.json(paytmParams);
  });
});

payment.post("/", (req, res) => {
  var paytmChecksum = "";
  var received_data = req.body;
  var paytmParams = {};
  for (var key in received_data) {
    if (key == "CHECKSUMHASH") {
      paytmChecksum = received_data[key];
    } else {
      paytmParams[key] = received_data[key];
    }
  }

  var isValidChecksum = checksum_lib.verifychecksum(
    paytmParams,
    "aZMUiL7OM%nvw@JN",
    paytmChecksum
  );
  if (isValidChecksum) {
    console.log("Checksum matched");

    /*
     * import checksum generation utility
     * You can get this utility from https://developer.paytm.com/docs/checksum/
     */

    var paytmParams = {};
    paytmParams["MID"] = received_data["MID"];
    paytmParams["ORDERID"] = received_data["ORDERID"];

    /*
     * Generate checksum by parameters we have
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
     */
    PaytmChecksum.generateSignature(paytmParams, "aZMUiL7OM%nvw@JN").then(
      function (checksum) {
        paytmParams["CHECKSUMHASH"] = checksum;

        var post_data = JSON.stringify(paytmParams);

        var options = {
          /* for Staging */
          hostname: "securegw-stage.paytm.in",

          /* for Production */
          // hostname: 'securegw.paytm.in',

          port: 443,
          path: "/order/status",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            console.log("Response: ", response);
            res.json(JSON.parse(response));
            res.send("Done");
          });
        });

        post_req.write(post_data);
        post_req.end();
      }
    );
  } else {
    console.log("Checksum mismatched");
    res.json({
      MESSAGE: "STOP MESSING AROUND WITH GATEWAY",
    });
  }
});
module.exports = payment;

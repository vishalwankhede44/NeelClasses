const checksum_lib = require("../paytm/checksum/checksum");
const express = require("express");
const payment = express.Router();

payment.get("/", (req, res) => {
  console.log("IN PAYTM");
  let params = {};
  (params["MID"] = "ZKBVLi06192328204943"),
    (params["WEBSITE"] = "WEBSTAGING"),
    (params["CHANNEL_ID"] = "WEB"),
    (params["INDUSTRY_TYPE_ID"] = "Retail"),
    (params["ORDER_ID"] = "ORD000"),
    (params["CUST_ID"] = "CUST0011"),
    (params["TXN_AMOUNT"] = "100"),
    (params["CALLBACK_URL"] = "http://localhost:5000/callback"),
    (params["EMAIL"] = "xyz@gmail.com"),
    (params["MOBILE_NO"] = "7875927143");
  checksum_lib.genchecksum(params, "aZMUiL7OM%nvw@JN", function (
    err,
    checksum
  ) {
    let txn_url = "https://securegw-stage.paytm.in/order/process";

    let form_fields = "";
    for (x in params) {
      form_fields +=
        "<input type='hidden' name='" + x + "' value='" + params[x] + "'/>";
    }

    form_fields +=
      "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "'/>";

    var html =
      '<html><body><center><h1>Please wait! Do not refresh the page</h1></center><form method="post" action="' +
      txn_url +
      '" name="f1">' +
      form_fields +
      '</form><script type="text/javascript"> document.f1.submit() </script></body></html>';
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
  });
});
module.exports = payment;

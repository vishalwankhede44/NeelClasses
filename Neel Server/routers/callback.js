const express = require("express");
const callback = express.Router();
callback.post("/", (req, res) => {
  console.log(req.param);
});

module.exports = callback;

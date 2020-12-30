const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

var app = express();

app.listen(8080, () => {
    console.log("hello");
    console.log("Express Server started at port: " + 8080);
  });
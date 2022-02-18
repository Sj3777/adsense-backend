const express = require("express");
const app = express();
const userRouter = require("./routers/userRouter");
const bodyParser = require("body-parser")
module.exports = function (app) {
  // app.use(express.json());
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());


  //base api
  app.use("/v1/users", userRouter);
};

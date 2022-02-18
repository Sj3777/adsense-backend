var express = require("express");
var mongoose= require("mongoose");
var app = express();
require("./app")(app);
var config = require("./config");
const port=7000;

mongoose.connect(config.database, {
    useNewUrlParser: true , useUnifiedTopology: true,
}).then(async(con)=>{
      console.log("Db connected successfully");
})
// var db = mongoose.connection;
// db.on("error", function (err) {});
// db.once("open", function () {
// });

app.get("/test",(req,res)=>{
     res.status(200).send({msg: "success"});
})
app.listen(port,()=>{
    console.log("Magic happens on port " + port);
});
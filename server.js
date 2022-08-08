const express = require("express");
const app = express();
const Mongoose = require("mongoose");
const { UserStartExam } = require("./Controllers/onlineExam.controller");
const startExam = require('./Routes/startExam.route')
const api_version = "api/v1";

// initilization of all configuration
(() => {
  body_parsar();
  db_config();
  routes_config();
  // 404
  global_Error_Handler();
})();

function db_config() {
  Mongoose.connect(
    'mongodb+srv://ajay:900@cluster0.umyjcyd.mongodb.net/Ajay_db?retryWrites=true&w=majority',
    (err) => {
      if (!err) {
        console.log("DB Connected Successfully");
      } else {
        console.log("Error: ", err);
      }
    }
  );
}

function body_parsar() {
  app.use(express.json());
}

function routes_config(){
    app.use('/', startExam);
}

function global_Error_Handler() {
  app.use((err, req, res, next) => {
    const errorStatus = req.status || 500;
    const error = err.message && [err.message] || err || "Internal Server Error";
    res.status(errorStatus).send({error})
  })
}


module.exports = app;

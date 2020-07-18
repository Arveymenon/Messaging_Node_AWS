var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const multer = require("multer");

var dbconfig = require("./database_config");
var mongoose = require("mongoose");

var indexRouter = require("./api/routes/index");
var sectionRouter = require("./api/routes/section");
var usersRouter = require("./api/routes/users");
var questionnaireRouter = require("./api/routes/questionnaire");
var messagingRouter = require("./api/routes/messages");

var socket = require("./services/socket_connection.js");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(
  "",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET, OPTIONS");
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log(req.method);
  if (
    req.method === "PUT" ||
    req.method === "POST" ||
    req.method === "PATCH" ||
    req.method === "DELETE" ||
    req.method === "OPTIONS" ||
    req.method === "GET"
  ) {
    res.status(200);
    next();
  } else {
    console.log("Non accessable");
    return next(createError(404));
  }
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/section", sectionRouter);
app.use("/questionnaire", questionnaireRouter);

app.use("/messages", messagingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// socket connection
socket(app);

module.exports = app;

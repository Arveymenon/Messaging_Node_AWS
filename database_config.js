var mysql = require("mysql");

var mongoose = require("mongoose");
// var env_ =

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "garage_uncle",
//   port: 8889
// });
// connection.connect();

mongoose.connect(
  "mongodb+srv://arvey:arvey2509@node-rest-apis-ptmt1.mongodb.net/test?retryWrites=true&w=majority",
  {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,}
);


// module.exports = connection;
module.exports = mongoose;

// connect to db function
const mongoose = require('mongoose');
require("dotenv").config();


function connectToDB() {
      // connect to db
  mongoose.connect(process.env.MONGODB_URI );
  // create db connection
  const db = mongoose.connection;
  // log error if db connection fails
  db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
  });
  // log success if db connection is successful
  db.once("open", function() {
    console.log("Mongoose connection successful.");
  });
}
module.exports = connectToDB;
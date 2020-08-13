const express = require("express");
const db = require("./models");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const session = require("express-session");
const passport = require("./config/passport");
const PORT = process.env.PORT || 3001;

// middleware
console.log("server 1");
app.use(express.urlencoded( { extended: true }));
app.use(express.json());
// serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
console.log("server 2");
// use sessions to keep track of user
app.use(session({ secret: "jenblogUser", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
console.log("server 3");
// routes
app.use(routes);
console.log("server 4");
// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/jenblog", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});
console.log("server 5");

// start API server
app.listen(PORT, function() {
  console.log(`API Server now listening on PORT ${PORT}!`);
});
console.log("server 6");
const express = require("express");
const db = require("./models");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const session = require("express-session");
const passport = require("./config/passport");
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.urlencoded( { extended: true }));
app.use(express.json());
// serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// use sessions to keep track of user
app.use(session({ secret: "jenblogUser", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
// routes
app.use(routes);

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://jenbloguser:Hes7adalc!@ds359868.mlab.com:59868/heroku_thv6xjsh", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

// start API server
app.listen(PORT, function() {
  console.log(`API Server now listening on PORT ${PORT}!`);
});
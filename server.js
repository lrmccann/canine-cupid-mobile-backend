const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 27017;
const cors = require('cors');
// const config = require("./config")

app.use(cors())

// solution for CORS policy issues
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin",  "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/users", { useNewUrlParser: true, useUnifiedTopology: true });
//ccmobile doesnt for any of the three combos , 503 error with users
// ccusers doesnt for any of the three combos , 503 error with users


app.get("/status", function(req, res) {
  res.send("Welcome to Canine Cupid Mobile!");
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

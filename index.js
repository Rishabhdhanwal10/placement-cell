const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');

app.use(cors());

// setting up the connection with db
require("./config/database").connect();

// getting the environment variables from config.env file
require('dotenv').config({path: './config.env'});

const PORT = process.env.PORT || 5000;
const expressLayouts = require("express-ejs-layouts");

// using static files(css)
app.use("/assets", express.static('./assets'));

// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(expressLayouts);

// set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "placement-cell",
    secret: process.env.SESSION_SECRET_KEY,
    saveUninitialized: false,
    resave: false,

    store: MongoStore.create({
      mongoUrl: process.env.DATABASE,
      autoRemove: "disabled",
    }),
    function(err) {
      console.log(err || "connect-mongodb setup ok");
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// sets the authenticated user in the response
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use("/", require("./routes"));

app.listen(PORT || 5000, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
    return;
  }
  console.log(`server is running on port: ${PORT}`);
});

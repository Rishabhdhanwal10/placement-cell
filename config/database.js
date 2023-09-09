
//connecting mongoose with database
const mongoose = require("mongoose");

require('dotenv').config({path: './config.env'});

exports.connect = () => {
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB CONNECTED SUCCESSFULLY"))
    .catch((err) => {
      console.log(`DB CONNECTION FAILED ${err}`);
    });
};

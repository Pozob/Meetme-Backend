const mongoose = require("mongoose");


 mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
     console.log("Connected to MongoDB Database");
 }).catch(error => {
     console.log("Error while connecting to DB: " + error);
 });


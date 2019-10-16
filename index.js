require("dotenv").config();
const express = require("express");
const app = express();

require("./startup/db");
require("./startup/cors")(app);
require("./startup/routes")(app);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
});
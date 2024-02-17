const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

//ROUTE IMPORTS
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);


//Middleware for error
const errorMiddleware = require("./middelware/error");

app.use(errorMiddleware);

module.exports = app;
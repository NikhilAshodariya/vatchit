const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const CONFIG = require("./config.json");

// All routers

// server start
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res, next)=>{
    res.send("This is great");
});

app.listen(CONFIG.PORT, () => {
    console.log("Server listening on port 8081");
});

module.exports = app;
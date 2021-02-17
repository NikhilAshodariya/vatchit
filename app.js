const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const CONFIG = require("./config.json");

// All routers
const usersRouter = require('./server/routes/User_routes');

// server start
const app = express();
// starting socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/users", usersRouter);

app.get("/", (req, res, next)=>{
    res.send("This is great");
});

io.on('connection', () =>{
    console.log('a user is connected');
})

// app.listen(CONFIG.PORT, () => {
//     console.log("Server listening on port 8081");
// });
var server = http.listen(CONFIG.PORT, () => {
    console.log('server is running on port', server.address().port);
});

module.exports = app;
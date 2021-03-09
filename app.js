const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


const CONFIG = require("./config.json");

// All routers
const usersRouter = require('./server/routes/User_routes');
const loginRouter = require("./server/routes/Login_routes");
const signupRouter = require("./server/routes/SignUp_routes");

// server start
const app = express();
// starting socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }});

app.use(cors()) // cool now everything is handled!

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/signup",signupRouter);

app.get("/", (req, res, next)=>{
    res.send("This is great");
});

temp = []

// io.on('connection', (socket) =>{
//     console.log('a user is connected'+ Object.keys(socket));
//     temp.push(socket["client"]["id"])
//     console.log(socket["client"]["id"])
// })

app.listen(CONFIG.PORT, () => {
    console.log("Server listening on port 8081");
});
// var server = http.listen(CONFIG.PORT, () => {
//     console.log('server is running on port', server.address().port);
// });

module.exports = app;
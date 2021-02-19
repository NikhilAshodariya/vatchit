const express = require('express');
const Login = require("../data/Login_data");

const router = express.Router();

const isValidUser = async (req, res, next) => {
    try {
        console.log(req.body)
        let check = await Login.isValidUser(req.body.email, req.body.password);
        console.log(check);
        res.header("Access-Control-Allow-Origin", "*");
        res.send(check);
    }
    catch (e) {
        console.log("invalid username passed");
        res.header("Access-Control-Allow-Origin", "*");
        res.send(false);
    }

};

router.post("/", isValidUser);

// router.post("/", isValidUser);

module.exports = router;
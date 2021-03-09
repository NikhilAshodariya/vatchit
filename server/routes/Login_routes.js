const express = require('express');
const Login = require("../data/Login_data");

const router = express.Router();

const isValidUser = async (req, res, next) => {
    try {
        let check = await Login.isValidUser(req.body.email, req.body.password);
        res.header("Access-Control-Allow-Origin", "*");
        res.send({
            "status": check
        });
    }
    catch (e) {
        console.log("invalid username passed");
        res.header("Access-Control-Allow-Origin", "*");
        res.send({
            "status": "Invalid request"
        });
    }

};

router.post("/", isValidUser);

module.exports = router;
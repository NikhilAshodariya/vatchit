const express = require('express');
const Signup = require("../data/SignUp_data");

const router = express.Router();

const createUser = async (req, res, next) => {
    try {
        let check = await Signup.addUser(req.body.email, req.body.password);

        res.header("Access-Control-Allow-Origin", "*");
        res.send({
            "status":check
        });
    }
    catch (e) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send({
            "status": "Cannot create User"
        });
    }
};

router.post("/", createUser);

module.exports = router;
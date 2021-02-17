const express = require('express');
const User = require("../data/User_data");

const router = express.Router();

const getFriendsListForUser = async (req, res, next) => {
    let check = await User.getFriendsListForUser(req.params.user_email);
    res.header("Access-Control-Allow-Origin", "*");
    res.send(check);
};

const createUser = async (req, res, next) => {
    let returnInfo = await User.createUser({
        "email": req.params.user_email
    });
    res.header("Access-Control-Allow-Origin", "*");
    res.send(returnInfo);
};

const addFriendsToList = async (req, res, next) => {
  let returnInfo = await User.addFriendsToList({
      "friends": req.body.friends,
      "email": req.params.user_email,
  });

  res.send(returnInfo);
};

router.get("/:user_email/friends", getFriendsListForUser);
router.post("/:user_email", createUser);
router.post("/:user_email/friends",addFriendsToList);

module.exports = router;
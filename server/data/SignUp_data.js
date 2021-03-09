const mongoCollections = require("../config/mongoCollections.js");
const bcrypt = require('bcrypt');
const CONFIG = require("../../config.json");

const Login = mongoCollections.login;

const addUser = async (email, password) => {
    if(
        (email !== undefined && email !==  "") &&
        (password !== undefined && password !== "")
    ) {
        let LoginCollection = await Login();
        let checkUser = await LoginCollection.findOne({
            "email":email
        });
        if (checkUser!==undefined && checkUser!==null) {
            return "User already exists";
            // throw new Error("User already exists");
        } else {

            let hashedPassword = await bcrypt.hash(password, CONFIG.SALT);

            let User = await LoginCollection.insertOne({
                "email": email,
                "password": hashedPassword
            });
            if(User!== undefined && User!==null) {
                return "Success";
                // const {ops} = User;
                // return {"email":ops[0]["email"],"isUserCreated":true};
            } else {
                return "UserName cannot be created";
                // throw new Error("UserName cannot be created");
            }
        }
    } else {
        return "UserName and Password Incorrect dude";
        // throw new Error("UserName and Password Incorrect dude")
    }
};



module.exports = {
    "addUser": addUser,
};
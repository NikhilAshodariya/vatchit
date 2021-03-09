const mongoCollections = require("../config/mongoCollections.js");
const bcrypt = require("bcrypt");

const Login = mongoCollections.login;

const isValidUser = async (email, password) => {
    if(
        (email !== undefined && email !==  "") &&
        (password !== undefined && password !== "")
    ) {
        let LoginCollection = await Login();

        let User = await LoginCollection.findOne({
            email: email
        });
        if (User !== null) {
            let result = await bcrypt.compare(password, User.password);
            if(result) {
                return "Success";
            } else {
                return "Wrong Password";
            }
        }
        else {
            return "User not found";
        }
    } else {
        return "User not found";
        // throw new Error("UserName and Password not supplied")
    }
};


module.exports = {
    "isValidUser": isValidUser,
};
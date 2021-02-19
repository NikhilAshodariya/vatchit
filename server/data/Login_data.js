const mongoCollections = require("../config/mongoCollections.js");

const Login = mongoCollections.login;

const isValidUser = async (email, password) => {
    if(
        (email !== undefined && email !==  "") &&
        (password !== undefined && password !== "")
    ) {
        let LoginCollection = await Login();

        let User = await LoginCollection.findOne({
            email: email,
            password: password
        });

        return !(User === undefined || User === null);
    } else {
        throw new Error("UserName and Password not supplied")
    }

};


module.exports = {
    "isValidUser": isValidUser,
};
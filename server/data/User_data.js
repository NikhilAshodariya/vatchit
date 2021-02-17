const mongoCollections = require("../config/mongoCollections.js");

const Users = mongoCollections.users;

const getFriendsListForUser = async (email) =>{
    let usersCollection = await Users();

    let User = await usersCollection.findOne({
        email: email
    });

    return User["friends"];
};

const createUser = async (data) => {
    let usersCollection = await Users();

    const insertInfo = await usersCollection.insertOne({
        "email": data.email,
        "friends": []
    });

    const {
        ops
    } = insertInfo;
    return ops[0];
};

const addFriendsToList = async(data) => {
    // Todo: need to check if the user friends already exists then remove it.
    let usersCollection = await Users();
    let returnVal = {};

    for(let email of data.friends) {
        let User = await usersCollection.findOne({
            email: email
        });
        if(User!==undefined && User!=null){
            returnVal[email] = "Success";
            try{
                let info = await usersCollection.updateOne({
                    email: data.email
                }, {
                    "$push": {
                        "friends": User
                    }
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            returnVal[email] = "Failed";
        }
    }
    return returnVal;
};

module.exports = {
    "getFriendsListForUser": getFriendsListForUser,
    "createUser": createUser,
    "addFriendsToList": addFriendsToList
};
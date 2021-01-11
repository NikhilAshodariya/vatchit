const dbConnection = require("./mongoConnection");

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const {
    collections
} = require('./DBConfig.json');

const getCollectionFn = collection => {
    let _col = undefined;

    return async () => {
        if (!_col) {
            const db = await dbConnection();
            _col = await db.collection(collection);
        }

        return _col;
    };
};

const getAllCollections = () => {
  const obj = {};
  collections.forEach((val,index) => {
      obj[val] = getCollectionFn(val)
  });
  return obj;
};

module.exports = getAllCollections();

/* Now, you can list your collections here: */
// module.exports = {
//     users: getCollectionFn("users"),
//     roles: getCollectionFn("roles"),
//     permissions: getCollectionFn("permissions"),
//     roles_permissions: getCollectionFn("roles_permissions"),
//     users_roles: getCollectionFn("users_roles")
// };
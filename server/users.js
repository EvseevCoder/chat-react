const { trimString } = require("./utils");

let users = [];

const addUser = (user) => {
    const userName = trimString(user.name);
    const userRoom = trimString(user.room);

    const isExist = users.find((user) => trimString(user.room) === userRoom && trimString(user.name) === userName);

    !isExist && users.push(user);

    const currentUser = isExist || user;

    return { isExist: !!isExist, user: currentUser };
}

module.exports = { addUser };
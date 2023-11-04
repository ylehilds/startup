// Using "find()" returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.
const util = require('./util.js');


exports.isUserAlreadyExist = function(username, users) {
    return users.find(user => user.username == username)
}

exports.signup = function(username, password, users) {
    const user = { username, password, id: util.uuidv4()}
    users.push(user)
    return user
}

exports.signin = function(username, password, users) {
    let userIndex = users.findIndex(user => user.username == username && user.password == password);
    if (userIndex == -1) {
    return false;
    }
    return users[userIndex]
}

// Using "find()" returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.
const util = require('./util.js');
const DB = require('./database.js');

exports.isUserAlreadyExist = async function(username) {
    const user = await DB.getUser(username)
    if (user.length > 0) return true
    return false
    // return users.find(user => user.username == username)
}

exports.signup = async function(username, password) {
    await DB.setUser(username, password, id = util.uuidv4())
    const user = await DB.getUser(username)
    return user
}

exports.signin = async function(username, password) {
    const user = await DB.getUser(username)

    let userIndex = user.findIndex(user => user.userId == username && user.password == password);
    // const quiz = quizzes.find(({quizId: id}) => id === quizId);

    if (userIndex == -1) {
    return false;
    }
    return user
}

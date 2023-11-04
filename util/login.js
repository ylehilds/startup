// Using "find()" returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.

exports.isUserAlreadyExist = function(username, users) {
    return users.find(user => user.username == username)
}

exports.signup = function(username, password, users) {
    const user = { username, password, id: uuidv4()}
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

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
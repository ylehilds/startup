function getUsername() {
    let users = localStorage.getItem("users")
    if(users) {
        users = JSON.parse(users)
    } else {
        users = []
        localStorage.setItem("users", JSON.stringify(users))
    }
    let currentUserIndex = users.findIndex(user => user.isLoggedIn == true);
    if (currentUserIndex == -1) {
      alert("You are not logged in");
      return;
    } else {
        document.getElementById("username").textContent = users[currentUserIndex].username
    }
}

getUsername()
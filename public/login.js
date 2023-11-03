
function signIn() {
    var usernameAction = document.getElementById("username").value
    var passwordAction = document.getElementById("password").value
    
    let users = localStorage.getItem("users")
    users = JSON.parse(users)
    let currentUser = users.find(user => user.username == usernameAction && user.password == passwordAction)
    if (currentUser != null) {
        checkLogin(users)
        let currentUserIndex = users.findIndex(user => user.username == usernameAction && user.password == passwordAction);
        if (currentUserIndex == -1) {
        alert("You are not logged in");
        return;
        }
        users[currentUserIndex].isLoggedIn = true;
        localStorage.setItem("users", JSON.stringify(users))
        window.location = "dashboard.html"
    }
    else {
        alert("Login failed")
    }
}

function signOut(users) {
    if(!users) {
        users = localStorage.getItem("users")
        if(users) {
            users = JSON.parse(users)
        } else {
            users = []
            localStorage.setItem("users", JSON.stringify(users))
        }
    }
    
    let currentUserIndex = findCurrentUserIndex(users)
    if (currentUserIndex == -1) {
      alert("You are not logged in");
      return;
    }
    users[currentUserIndex].isLoggedIn = false;
    localStorage.setItem("users", JSON.stringify(users));
  }

  function signOutRedirect() {
    signOut()
    window.location = "index.html"
  }

function signUp(users) {
    if(!users) {
        users = localStorage.getItem("users")
        if(users) {
            users = JSON.parse(users)
        } else {
            users = []
            localStorage.setItem("users", JSON.stringify(users))
        }
    }

    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    if (username && password) {
        if (isUserAlreadyExist(users, username)) {
            alert("User already exists, please create a different username!")
            return
        }
        checkLogin(users)
        const user = { username, password, isLoggedIn: true , scores:[], id: uuidv4()};
        users.push(user)
        localStorage.setItem("users", JSON.stringify(users));
        window.location = "dashboard.html";
  } else {
    alert("SignUp failed");
  }
}

function isUserAlreadyExist(users, username) {
    return users.find(user => user.username == username)
}

function checkLogin(users) {
    let currentUser = users.find(user => user.isLoggedIn == true)
    if (currentUser != null) {
        signOut(users)
    }
}

function pageLoginState() {
    let users = localStorage.getItem("users")
    if(users) {
        users = JSON.parse(users)
    } else {
        users = []
        localStorage.setItem("users", JSON.stringify(users))
    }
    let currentUserIndex = findCurrentUserIndex(users)
    if (currentUserIndex == -1) {
      console.log("You are not logged in");
      return;
    } else {
        document.getElementById("signIn").style.display = "none"
        document.getElementById("signUp").style.display = "none"
        document.getElementById("signOut").style.display = "inline-block"
        document.getElementById("goToDashboard").style.display = "inline-block"
        document.getElementById("userPasswordInputs").style.display = "none"
        }
}

function goToDashboard() {
    window.location = "dashboard.html"
}

function findCurrentUserIndex(users) {
    return users.findIndex(user => user.isLoggedIn == true);
}

document.querySelector('#password').addEventListener('keyup', function(event){
    if (event.keyCode === 13) {
        signIn()
    }
  })

pageLoginState()

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
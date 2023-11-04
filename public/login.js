function signOut(users) {
    localStorage.clear()
  }

  function signOutRedirect() {
    signOut()
    window.location = "index.html"
  }

async function signUp(users) {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    if (username && password) {
        const user = await signUpUser(username, password)
        if (user) {
            window.location = "dashboard.html";
        } else {
            alert("User already exists, please create a different username!")
            return
        }
        localStorage.setItem("user", JSON.stringify(user));  
  } else {
    alert("SignUp failed");
  }
}

async function signIn(username, password) {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    if (username && password) {
        const user = await signInUser(username, password)
        if (user) {
            window.location = "dashboard.html";
        } else {
            alert("Invalid Username/Password")
            return
        }
        localStorage.setItem("user", JSON.stringify(user));
  } else {
    alert("SignIn failed");
  }
}

async function signUpUser(username, password) {
    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    if (response.status === 200) {
        return response.json();
    } else {
        return null;
    }
}

async function signInUser(username, password) {
    const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    if (response.status === 200) {
        return response.json();
    } else {
        return null;
    }
}

function pageLoginState() {
    let user = localStorage.getItem("user")
    if (user) {
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

document.querySelector('#password').addEventListener('keyup', function(event){
    if (event.keyCode === 13) {
        signIn()
    }
  })

pageLoginState()

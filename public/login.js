(async () => {
    const user = localStorage.getItem('user');
    if (user) {
      setDisplay('navControls', 'contents');
    } else {
      setDisplay('navControls', 'none');
    }
  })();

function signOut(users) {
    localStorage.clear()
    fetch(`/api/auth/logout`, {
        method: 'delete',
      }).then(() => (window.location.href = '/'));
  }

  function signOutRedirect() {
    signOut()
    window.location = "index.html"
  }

async function signUp() {
    var userId = document.getElementById("userId").value
    var password = document.getElementById("password").value
    if (userId && password) {
        const user = await signUpUser(userId, password)
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));  
            window.location = "dashboard.html";
        } else {
            alert("User already exists, please create a different userId!")
            return
        }
  } else {
    alert("SignUp failed");
  }
}

async function signIn() {
    var userId = document.getElementById("userId").value
    var password = document.getElementById("password").value
    if (userId && password) {
        const user = await signInUser(userId, password)
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            window.location = "dashboard.html";
        } else {
            alert("Invalid Username/Password")
            return
        }
  } else {
    alert("SignIn failed");
  }
}

async function signUpUser(userId, password) {
    const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
    });
    if (response.status === 200) {
        return response.json();
    } else {
        return null;
    }
}

async function signInUser(userId, password) {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
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

function setDisplay(controlId, display) {
    const playControlEl = document.querySelector(`#${controlId}`);
    if (playControlEl) {
      playControlEl.style.display = display;
    }
  }
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

function creatingDashboard() {
    let quizzes = localStorage.getItem("quizzes");
    if (quizzes) {
      quizzes = JSON.parse(quizzes);
    } else {
      quizzes = {};
      localStorage.setItem("quizzes", JSON.stringify(quizzes));
    }
  
    const quizList = document.createElement('div');
    quizList.classList.add('quiz-list');
  
    for (const quizId in quizzes) {
      const quiz = quizzes[quizId];
      const quizItem = document.createElement('div');
      quizItem.classList.add('quiz-item', 'card', 'mb-3');
  
      const quizTitle = document.createElement('h2');
      quizTitle.innerText = quiz.title;
      quizTitle.classList.add('card-header');
      quizItem.appendChild(quizTitle);
  
      const buttonGroup = document.createElement('div');
      buttonGroup.classList.add('card-body', 'd-flex', 'justify-content-end');
  
      const editButton = document.createElement('button');
      editButton.innerText = 'Edit';
      editButton.classList.add('btn', 'btn-primary', 'me-2');
      editButton.addEventListener('click', () => {
        // alert(quizId)
        window.location.href = `edit.html?quizId=${quizId}`;
        // handle edit button click
      });
      buttonGroup.appendChild(editButton);
  
      const takeButton = document.createElement('button');
      takeButton.innerText = 'Take';
      takeButton.classList.add('btn', 'btn-success', 'me-2');
      takeButton.addEventListener('click', () => {
        // handle take button click
      });
      buttonGroup.appendChild(takeButton);
  
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.classList.add('btn', 'btn-danger');
      deleteButton.addEventListener('click', () => {
        delete quizzes[quizId];
        const updatedQuizzes = JSON.stringify(quizzes);
        localStorage.setItem('quizzes', updatedQuizzes);
        window.location.reload();        
      });
      buttonGroup.appendChild(deleteButton);
  
      quizItem.appendChild(buttonGroup);
      quizList.appendChild(quizItem);
    }
  
    return quizList;
  }
  
  const dashboard = document.getElementById('dashboard');
  dashboard.appendChild(creatingDashboard());
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

function creatingDashboard(type) {

    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(user => user.isLoggedIn == true);
    let quizzes = localStorage.getItem("quizzes")
    if (quizzes) {
      quizzes = JSON.parse(quizzes);
    } else {
      quizzes = {};
      localStorage.setItem("quizzes", JSON.stringify(quizzes));
    }

    let allQuizzes = quizzes
    if (type == 'myDashboard') quizzes = Object.fromEntries(Object.entries(quizzes).filter(([key, value]) => value.creatorId.includes(user.id)));
    else if (type == 'communityDashboard') quizzes = Object.fromEntries(Object.entries(quizzes).filter(([key, value]) => !value.creatorId.includes(user.id)));
  
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
      buttonGroup.classList.add('card-body', 'd-flex');
  
      if (type == 'myDashboard') {
      const editButton = document.createElement('button');
      editButton.innerText = 'Edit';
      editButton.classList.add('btn', 'btn-primary', 'me-2');
      editButton.addEventListener('click', () => {
        // alert(quizId)
        window.location.href = `edit.html?quizId=${quizId}`;
        // handle edit button click
      });
      buttonGroup.appendChild(editButton);
    }
  
      const takeButton = document.createElement('button');
      takeButton.innerText = 'Take';
      takeButton.classList.add('btn', 'btn-success', 'me-4');
      takeButton.addEventListener('click', () => {
        // handle take button click
        window.location.href = `quiz.html?quizId=${quizId}`;
      });
      buttonGroup.appendChild(takeButton);
  
      if (type == 'myDashboard') {
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.classList.add('btn', 'btn-danger');
      deleteButton.addEventListener('click', () => {
        // Now I need to remove it from the master quizzes list
        delete allQuizzes[quizId];
        
        // save the changes to local storage
        const updatedQuizzes = JSON.stringify(allQuizzes);
        localStorage.setItem('quizzes', updatedQuizzes);
        window.location.reload();        
      });
      buttonGroup.appendChild(deleteButton);
    }
  
      quizItem.appendChild(buttonGroup);
      quizList.appendChild(quizItem);
    }
  
    return quizList;
  }
  
  const dashboard = document.getElementById('myDashboard');
  dashboard.appendChild(creatingDashboard('myDashboard'));

  const commDashboard = document.getElementById('communityDashboard');
  commDashboard.appendChild(creatingDashboard('communityDashboard'));
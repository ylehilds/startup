function getUsername() {
    let user = getUser()
    if (user) document.getElementById("username").textContent = user.username
}

function getUser() {
  let user = localStorage.getItem("user")
  if (user) {
    user = JSON.parse(user)
    return user
  }
}

getUsername()

async function getUsers() {
  const response = await fetch('/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200) {
    return response.json();
  } else {
    return null;
  }

}

async function creatingDashboard(type) {
    const users = await getUsers()
    const user = getUser()
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
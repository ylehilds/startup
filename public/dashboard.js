function getUsername() {
    let user = getUser()
    if (user) document.getElementById("username").textContent = user.userId
}

function getUser() {
  let user = localStorage.getItem("user")
  if (user) {
    user = JSON.parse(user)
    return user
  }
}

getUsername()

// async function getUser() {
//   const response = await fetch('/api/user', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   if (response.status === 200) {
//     return response.json();
//   } else {
//     return null;
//   }
// }

async function getQuizzes() {
  const response = await fetch('/api/quizzes', {
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

async function deleteQuiz(quizId) {
  const response = await fetch(`/api/quizzes/${quizId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (response.status === 204) {
    console.log('delete successful')
  } else {
    alert('Error deleting quiz.');
  }
}

async function creatingDashboard(type) {
    // const users = await getUsers()
    const user = getUser()
    let quizzes = await getQuizzes()

    // let allQuizzes = quizzes
    if (type == 'myDashboard') quizzes = Object.fromEntries(Object.entries(quizzes).filter(([key, value]) => value.creatorId.includes(user.id)));
    else if (type == 'communityDashboard') quizzes = Object.fromEntries(Object.entries(quizzes).filter(([key, value]) => !value.creatorId.includes(user.id)));
  
    const quizList = document.createElement('div');
    quizList.classList.add('quiz-list');

    for (const [key, value] of Object.entries(quizzes)) {
      // const quiz = quizzes[quizId];
      const quizItem = document.createElement('div');
      quizItem.classList.add('quiz-item', 'card', 'mb-3');
  
      const quizTitle = document.createElement('h2');
      quizTitle.innerText = value.title;
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
        window.location.href = `edit.html?quizId=${value.quizId}`;
        // handle edit button click
      });
      buttonGroup.appendChild(editButton);
    }
  
      const takeButton = document.createElement('button');
      takeButton.innerText = 'Take';
      takeButton.classList.add('btn', 'btn-success', 'me-4');
      takeButton.addEventListener('click', () => {
        // handle take button click
        window.location.href = `quiz.html?quizId=${value.quizId}`;
      });
      buttonGroup.appendChild(takeButton);
  
      if (type == 'myDashboard') {
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.classList.add('btn', 'btn-danger');
      deleteButton.addEventListener('click', () => {
        deleteQuiz(value.quizId);
        window.location.reload();        
      });
      buttonGroup.appendChild(deleteButton);
    }
  
      quizItem.appendChild(buttonGroup);
      quizList.appendChild(quizItem);
    }
  
    return quizList;
  }

  async function init() {
    let dashboard = document.getElementById('myDashboard')
    dashboard.appendChild(await creatingDashboard('myDashboard'));
  
    let commDashboard = document.getElementById('communityDashboard')
    commDashboard.appendChild(await creatingDashboard('communityDashboard'))
  }

  init()
  
  
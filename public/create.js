const questionForm = document.getElementById('question-form');
const questionList = document.getElementById('question-list');
const quizId = uuidv4();

questionForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const quizTitle = document.getElementById('quizTitle').value;
  const question = {
    question: document.getElementById('question').value,
    options: [
      document.getElementById('option1').value,
      document.getElementById('option2').value,
      document.getElementById('option3').value,
      document.getElementById('option4').value,
    ],
    answerIndex: parseInt(document.getElementById('answer').value.slice(-1)) - 1,
  };
  const li = document.createElement('li');
  li.innerHTML = `
    <h3>${question.question}</h3>
    <ul>
      <li>${question.options[0]}</li>
      <li>${question.options[1]}</li>
      <li>${question.options[2]}</li>
      <li>${question.options[3]}</li>
    </ul>
    <button class="delete-button">Delete</button>
  `;
  questionList.appendChild(li);
  const inputToSkip = document.getElementById('quizTitle');
  const currentValue = inputToSkip.value;
  document.getElementById('question-form').reset();
  inputToSkip.value = currentValue;
  await saveQuestion(question, quizId, quizTitle);
});

questionList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-button')) {
    event.target.parentElement.remove();
    deleteQuestion(event.target.parentElement, quizId);
  }
});

async function saveQuestion(question, quizId, quizTitle) {
    const user = JSON.parse(localStorage.getItem('user'))
    const response = await fetch('/api/quizzes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, quizTitle, quizId, user })
    });
    if (response.status === 201) {
      console.log(await response.json())
    } else {
      alert('Error creating quiz/question.');
    }
  }

async function deleteQuestion(li, quizId) {
  const user = JSON.parse(localStorage.getItem('user'))
  const questionText = li.querySelector('h3').textContent;
  const response = await fetch('/api/quizzes', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question, quizTitle, quizId, user, questionText })
  });
  if (response.status === 204) {
    console.log('delete successful')
  } else {
    alert('Error creating quiz/question.');
  }
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => {
  const form = document.getElementById('question-form');
  const inputToSkip = document.getElementById('quizTitle');
  const currentValue = inputToSkip.value;
  form.reset();
  inputToSkip.value = currentValue;
});
const questionForm = document.getElementById('question-form');
const questionList = document.getElementById('question-list');
const quizId = uuidv4();

questionForm.addEventListener('submit', (event) => {
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
  document.getElementById('question-form').reset();
  saveQuestionToLocalStorage(question, quizId, quizTitle);
});

questionList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-button')) {
    event.target.parentElement.remove();
    deleteQuestionFromLocalStorage(event.target.parentElement, quizId);
  }
});

function saveQuestionToLocalStorage(question, quizId, quizTitle) {
    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || {};
    quizzes[quizId] = quizzes[quizId] || { title: quizTitle, questions: [] };
    quizzes[quizId].questions.push(question);
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  }

function deleteQuestionFromLocalStorage(li, quizId) {
  let questions = JSON.parse(localStorage.getItem('quizzes'))[quizId] || [];
  const questionText = li.querySelector('h3').textContent;
  questions = questions.filter((question) => question.question !== questionText);
  let quizzes = JSON.parse(localStorage.getItem('quizzes')) || {};
  quizzes[quizId] = questions;
  localStorage.setItem('quizzes', JSON.stringify(quizzes));
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
  form.reset();
});
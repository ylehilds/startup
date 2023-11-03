const quizId = new URLSearchParams(window.location.search).get('quizId');
let questions = [];

// Helper functions
function mapIndexToLetter(index) {
  switch (index) {
    case 0:
      return 'a';
    case 1:
      return 'b';
    case 2:
      return 'c';
    case 3:
      return 'd';
  }
}

function revealResults() {
  let numCorrect = 0;
  const answerContainers = quizContainer.querySelectorAll('.answers');

  myQuestions.forEach((currentQuestion, questionNumber) => {

    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer !== currentQuestion.correctAnswer) {
      answerContainers[questionNumber].style.color = 'red';
    } else {
      numCorrect++;
      answerContainers[questionNumber].style.color = 'green';
    }
  });

  results.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  // const quizzes = JSON.parse(localStorage.getItem('quizzes'));
  const users = JSON.parse(localStorage.getItem('users'));
  const userIndex = users.findIndex(user => user.isLoggedIn == true);
  const user = users[userIndex];
  const score = numCorrect;
  const scoreObject = {
    quizId,
    score
  }
  const userScoreIndex = user.scores.findIndex(score => score.quizId == quizId);

  if (userScoreIndex == -1) {
    user.scores.push(scoreObject);
  } else {
    user.scores[userScoreIndex].score = scoreObject.score;
  }
  user.lastUpdated = new Date().toLocaleString();

  users[userIndex] = user;
  localStorage.setItem('users', JSON.stringify(users));
  // localStorage.setItem('quizzes', JSON.stringify(quizzes));
  alert('Quiz submitted successfully!');
}

// Method placeholder before we start using websockets
setInterval(() => {
  const score = Math.floor(Math.random() * 3000);
  const chatText = document.querySelector('#players-actions ul');
  chatText.innerHTML =
    `<li class="list-group-item"><span class="player-event">Eich</span> scored ${score}</div>` + chatText.innerHTML;
}, 5000);

function displayPreviousSlide() {
  displaySlide(currentSlide - 1);
}

function displaySlide(n) {
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;
  if (currentSlide === 0) {
    previousButton.style.display = 'none';
  }
  else {
    previousButton.style.display = 'inline-block';
  }
  if (currentSlide === slides.length - 1) {
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  }
  else {
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
}

function createQuiz() {
  const output = [];

  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      const answers = [];

      for (letter in currentQuestion.answers) {

        answers.push(
          `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
        );
      }

      output.push(
        `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
      );
    }
  );

  quizContainer.innerHTML = output.join('');
}

function displayNextSlide() {
  displaySlide(currentSlide + 1);
}

const submitButton = document.getElementById('submit');
const results = document.getElementById('results');
const quizContainer = document.getElementById('quiz');

const quizQuestions = localStorage.getItem("quizzes");
questions = JSON.parse(quizQuestions);
// const myQuestions = questions;
let myQuestions = []

questions[quizId].questions.forEach((question, index) => {
  const adjustFormatQuestion = {
    question: question.question,
    answers: {
      a: question.options[0],
      b: question.options[1],
      c: question.options[2],
      d: question.options[3]
    },
    correctAnswer: mapIndexToLetter(question.answerIndex)
  }
  myQuestions.push(adjustFormatQuestion)
})

createQuiz();

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

displaySlide(currentSlide);

previousButton.addEventListener("click", displayPreviousSlide);
submitButton.addEventListener('click', revealResults);
nextButton.addEventListener("click", displayNextSlide);

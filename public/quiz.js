(async function() {
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
  
  const user = JSON.parse(localStorage.getItem('user'));
  const score = numCorrect;
  const scoreObject = {
    quizId,
    score,
    username: user.userId
  }

  submitScore(user.id, scoreObject);
  alert('Quiz submitted successfully!');
}

async function submitScore(userId, score) {
  const response = await fetch(`/api/${userId}/score`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(score), // body data type must match "Content-Type" header
  })
  .catch((error) => {
    console.error("Error:", error);
  });
  // Store what the service gave us as the high scores
  const scores = await response.json();
  return scores // parses JSON response into native JavaScript objects 
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

const quizQuestions = await init(quizId);
const myQuizQuestions = quizQuestions[0].questions;
let myQuestions = [];

myQuizQuestions.forEach((question, index) => {
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


async function getQuizQuestions(quizId) {
  const response = await fetch(`/api/quizzes/${quizId}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
  .catch((error) => {
    console.error("Error:", error);
  });
  // Store what the service gave us as the high scores
  const quizQuestions = await response.json();
  return quizQuestions // parses JSON response into native JavaScript objects
}

async function init(quizId) {
  return await getQuizQuestions(quizId)
}
})();
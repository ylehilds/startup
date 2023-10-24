const quizId = new URLSearchParams(window.location.search).get('quizId');
let questions = [];

(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
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
        user.lastUpdated = new Date().toISOString();

        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
        // localStorage.setItem('quizzes', JSON.stringify(quizzes));
        alert('Quiz submitted successfully!');
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');

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
  
    // Start things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  
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
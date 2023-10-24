const questionList = document.getElementById('question-list');
const questionForm = document.getElementById('question-form');
const saveButton = document.getElementById('save-button');
const quizId = new URLSearchParams(window.location.search).get('quizId');
let questions = [];

if (quizId) {
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || {};
    const quiz = Object.entries(quizzes).find(([id, questions]) => id === quizId || id === uuidToString(quizId));
    if (quiz) {
        questions = quiz[1];
        displayQuestions();
    } else {
        questionList.innerHTML = '<p>Quiz not found.</p>';
    }
} else {
    questionList.innerHTML = '<p>No quiz ID specified.</p>';
}

saveButton.addEventListener('click', () => {
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || {};
    const quizIndex = Object.keys(quizzes).findIndex((id) => id === quizId || id === uuidToString(quizId));
    if (quizIndex !== -1) {
        const title = document.getElementById('editQuizTitle').value;
        questions.title = title;
        quizzes[quizId] = questions;
        localStorage.setItem('quizzes', JSON.stringify(quizzes));
        alert('Quiz saved successfully!');
    } else {
        alert('Quiz not found.');
    }
});

function displayQuestions() {
    const title = questions.title
    document.getElementById('editQuizTitle').value = title;
    questionList.innerHTML = '';
    questions.questions.forEach((question, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <div class="question-container">
          <div class="question-text">${question.question}</div>
          <button class="edit-button" data-index="${index}">Edit</button>
          <button class="delete-button" data-index="${index}">Delete</button>
        </div>
        <div class="edit-container" style="display: none;">
          <input type="text" placeholder="Question" class="question-input" value="${question.question}">
          <input type="text" placeholder="Option 1" class="option-input" value="${question.options[0]}">
          <input type="text" placeholder="Option 2" class="option-input" value="${question.options[1]}">
          <input type="text" placeholder="Option 3" class="option-input" value="${question.options[2]}">
          <input type="text" placeholder="Option 4" class="option-input" value="${question.options[3]}">
          <span>Answer:</span>
          <select class="answer-input">
            <option value="1" ${question.answerIndex === 0 ? 'selected' : ''}>Option 1</option>
            <option value="2" ${question.answerIndex === 1 ? 'selected' : ''}>Option 2</option>
            <option value="3" ${question.answerIndex === 2 ? 'selected' : ''}>Option 3</option>
            <option value="4" ${question.answerIndex === 3 ? 'selected' : ''}>Option 4</option>
          </select>
          <button class="save-button">Save</button>
          <button class="cancel-button">Cancel</button>
        </div>
      `;
        questionList.appendChild(li);
    });
    const addButton = document.createElement('button');
    addButton.innerText = 'Add Question';
    // addButton.classList.add('btn', 'btn-primary', 'mt-1');
    addButton.style.width = '20%';
    addButton.style.backgroundColor = '#4CAF50'

    addButton.addEventListener('click', () => {
        const question = {
            question: '',
            options: ['', '', '', ''],
            answerIndex: 0,
        };
        questions.questions.push(question);

        displayQuestions();

        const index = questions.questions.length - 1;
        const questionContainer = questionList.children[index].querySelector('.question-container');
        const editContainer = questionList.children[index].querySelector('.edit-container');
        questionContainer.style.display = 'none';
        editContainer.style.display = 'block';
        const questionInput = editContainer.querySelector('.question-input');
        const optionInputs = editContainer.querySelectorAll('.option-input');
        const answerInput = editContainer.querySelector('.answer-input');
        questionInput.focus();
        questionInput.setSelectionRange(0, questionInput.value.length);
        optionInputs[0].focus();
        optionInputs[0].setSelectionRange(0, optionInputs[0].value.length);
        editContainer.querySelector('.save-button').addEventListener('click', () => {
            questions.questions[index].question = questionInput.value;
            questions.questions[index].options[0] = optionInputs[0].value;
            questions.questions[index].options[1] = optionInputs[1].value;
            questions.questions[index].options[2] = optionInputs[2].value;
            questions.questions[index].options[3] = optionInputs[3].value;
            questions.questions[index].answerIndex = parseInt(answerInput.value) - 1;
            displayQuestions();
        });
        editContainer.querySelector('.cancel-button').addEventListener('click', () => {
            questions.questions.splice(index, 1);
            displayQuestions();
        });
    });

    questionList.appendChild(addButton);
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            const questionContainer = event.target.closest('.question-container');
            const editContainer = questionContainer.nextElementSibling;
            questionContainer.style.display = 'none';
            editContainer.style.display = 'block';
            const questionInput = editContainer.querySelector('.question-input');
            const optionInputs = editContainer.querySelectorAll('.option-input');
            const answerInput = editContainer.querySelector('.answer-input');
            questionInput.focus();
            questionInput.setSelectionRange(0, questionInput.value.length);
            optionInputs[0].focus();
            optionInputs[0].setSelectionRange(0, optionInputs[0].value.length);
            editContainer.querySelector('.save-button').addEventListener('click', () => {
                questions.questions[index].question = questionInput.value;
                questions.questions[index].options[0] = optionInputs[0].value;
                questions.questions[index].options[1] = optionInputs[1].value;
                questions.questions[index].options[2] = optionInputs[2].value;
                questions.questions[index].options[3] = optionInputs[3].value;
                questions.questions[index].answerIndex = parseInt(answerInput.value) - 1;
                displayQuestions();
            });
            editContainer.querySelector('.cancel-button').addEventListener('click', () => {
                questionContainer.style.display = 'flex';
                editContainer.style.display = 'none';
            });
        });
    });
    
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            questions.questions.splice(index, 1);
            displayQuestions();
        });
    });
}

function uuidToString(uuid) {
    return uuid.replace(/-/g, '');
}
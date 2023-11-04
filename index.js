const express = require('express');
const app = express();
const login = require('./util/login.js');
const create = require('./util/create.js');
const dashboard = require('./util/dashboard.js');

let scores = {}
let quizzes = {}
let users = []

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// signupUser
apiRouter.post('/signup', (req, res) => {
  try {
  const body = req.body
  const username = body.username
  const password = body.password
  if (!login.isUserAlreadyExist(username, users)) {
    const user = login.signup(username, password, users)
    res.status(200).send(user)
  }
} catch (error) {
  console.error(error)
}
  res.status(409).send()
});

// signinUser
apiRouter.post('/signin', (req, res) => {
  try {
  const body = req.body
  const username = body.username
  const password = body.password
  if (login.isUserAlreadyExist(username, users)) {
    const user = login.signin(username, password, users)
    res.status(200).send(user)
  }
} catch (error) {
  console.error(error)
}
  res.status(409).send()
});

// getQuizzes
apiRouter.get('/quizzes', (req, res) => {
  res.send(quizzes);
});

// getQuizzesQuizId
apiRouter.get('/quizzes/:quizId', async (req, res) => {
const quizId = req.params.quizId
  await res.status(200).send(quizzes[quizId]);
});

// createQuiz
apiRouter.post('/quizzes', async (req, res) => {
  const body = req.body
  const quiz = await create.createQuiz(body, quizzes)
  res.status(201).send(quiz);
});

// deleteQuestionQuizId
apiRouter.delete('/quizzes/', async (req, res) => {
  const body = req.body
  const quiz = await create.deleteQuestion(body, quizzes)
  res.status(204).send();
});

// editQuiz
apiRouter.post('/quizzes/:quizId', (req, res) => {
  const body = req.body
  const quizId = req.params.quizId
  res.send(users);
});

// deleteQuizId
apiRouter.delete('/quizzes/:quizId', async (req, res) => {
  const quizId = req.params.quizId
  const quizzesStorage = await dashboard.deleteQuiz(quizId, quizzes)
  res.status(204).send();
});

// loginUser
apiRouter.post('/user', (req, res) => {
  res.send(scores);
});

// logoutUser
apiRouter.delete('/user', (req, res) => {
  res.send(scores);
});

// GetScores
apiRouter.get('/users', (_req, res) => {
  res.send(users);
});

// GetScores
apiRouter.get('/scores', (_req, res) => {
  res.send(scores);
});

// scores are saved in memory and disappear whenever the service is restarted.
// SubmitScore
apiRouter.post('/:userId/score', (req, res) => {
  const body = req.body
  const userId = req.params.userId

  if (scores[userId]) {
    const userScores = scores[userId].scores;
    const userScoreIndex = userScores.findIndex(score => score.quizId == body.quizId);
    if (userScoreIndex == -1) {
      scores[userId].scores.push(body)
    } else {
      scores[userId].scores[userScoreIndex].score = body.score;
    }
  } else {
    scores[userId] = { scores: [ body ] };
  }
  scores[userId].lastUpdated = new Date().toLocaleString();
  scores[userId].username = body.username

  if (scores.length > 10) {
    scores.length = 10;
  }

  res.send(scores)
})

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

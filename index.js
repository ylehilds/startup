const express = require('express');
const app = express();

let scores = {};
// let users = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// // signupUser
// apiRouter.post('/signup', (req, res) => {
//   res.send(scores);
// });

// // loginUser
// apiRouter.post('/user', (req, res) => {
//   res.send(scores);
// });

// // logoutUser
// apiRouter.delete('/user', (req, res) => {
//   res.send(scores);
// });

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

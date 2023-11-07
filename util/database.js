const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
let dbCollection
const { ObjectID } = require('mongodb');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

exports.addScore = async function (score) {
  dbCollection = db.collection('scores');
  const result = await dbCollection.insertOne(score);
  return result;
}

exports.getHighScores = async function () {
  dbCollection = db.collection('scores');
  const query = { };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = await dbCollection.find(query, options);
  return cursor.toArray();
}

exports.addQuizScores = async function (scores) {
  dbCollection = db.collection('scores');
  const filter = { userId: scores.userId };
  const options = { upsert: true };
  const updateDoc = {
    $push: {
      scores: scores.scores,
    },
    $set: {
      lastUpdated: new Date().toLocaleString(),
    },
  };
  const result = await dbCollection.updateOne(filter, updateDoc, options);
  return result;
}

exports.addQuiz = async function (scores) {
  dbCollection = db.collection('quizzes');
  const filter = { userId: scores.userId };
  const options = { upsert: true };
  const updateDoc = {
    $push: {
      questions: scores.scores,
    },
    $set: {
      lastUpdated: new Date().toLocaleString(),
    },
  };
  const result = await dbCollection.updateOne(filter, updateDoc, options);
  return result;
}

exports.addQuestion = async function (data) {
  dbCollection = db.collection('quizzes');
  const filter = { quizId: data.quizId };
  const options = { upsert: true };
  const updateDoc = {
    $push: {
      questions: data.question,
    }
  };
  const result = await dbCollection.updateOne(filter, updateDoc, options);
  return result;
}

exports.editQuestion = async function (data, quizId) {
  dbCollection = db.collection('quizzes');
  const filter = { quizId: quizId};
  const updateDoc = {
    $set: {
      questions: data.questions,
    },
  };
  const result = await dbCollection.updateOne(filter, updateDoc);
  return result;
}

exports.deleteQuestion = async function (question) {
  dbCollection = db.collection('quizzes');
  await dbCollection.updateOne(
    { quizId: question.quizId },
    { $pull: { questions: { question: question.questionText } } }
);
return true
}

exports.deleteQuiz = async function (quizId) {
  dbCollection = db.collection('quizzes');
  await dbCollection.deleteOne(
    { quizId: quizId }
);
return true
}

exports.updateQuizScore = async function (userId, quizId, newScore) {
  dbCollection = db.collection('scores');
  const filter = { userId: userId, "scores.quizId": quizId };
  const updateDoc = {
    $set: {
      "scores.$": newScore,
      lastUpdated: new Date().toLocaleString(),
    },
  };
  const result = await dbCollection.updateOne(filter, updateDoc);
  return result;
}

exports.setQuizzes = async function (quiz) {
  dbCollection = db.collection('quizzes');
  const result = await dbCollection.insertOne(quiz);
  return result;
}

exports.getUserScores = async function (userId) {
  dbCollection = db.collection('scores');
  const query = { userId: userId };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = await dbCollection.find(query, options);
  return cursor.toArray();
}

exports.getUser = async function (userId) {
  dbCollection = db.collection('users');
  const query = { userId: userId };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = await dbCollection.find(query, options);
  return cursor.toArray();
}

exports.setUser = async function (userId, password, id) {
  dbCollection = db.collection('users');
  const user = { userId: userId, password: password, id: id }
  const result = await dbCollection.insertOne(user)
  return result;
}

exports.getQuizzes = async function (quizId) {
  dbCollection = db.collection('quizzes');
  const query = { quizId: quizId };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = await dbCollection.find(query, options);
  return cursor.toArray();
}

exports.getAllQuizzes = async function () {
  dbCollection = db.collection('quizzes');
  const query = { };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = await dbCollection.find(query, options);
  return cursor.toArray();
}

// module.exports = { addScore, getHighScores, getUserScores, addQuizScores, updateQuizScore };

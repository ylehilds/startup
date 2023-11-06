const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const scoreCollection = db.collection('scores');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function addScore(score) {
  const result = await scoreCollection.insertOne(score);
  return result;
}

async function getHighScores() {
  const query = { };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = await scoreCollection.find(query, options);
  return cursor.
  
  toArray();
}

async function addQuizScores(scores) {

  // Create a filter for movies with the title "Random Harvest"
  const filter = { [scores.userId]: { $exists: true } };

  /* Set the upsert option to insert a document if no documents match
    the filter */
  const options = { upsert: true };
  // Specify the update to set a value for the plot field
  const updateDoc = {
    $set: {
      [scores.userId]: { scores: scores.scores, lastUpdated: new Date().toLocaleString(), username: scores.username }
    },
  };
  // Update the first document that matches the filter
  const result = await scoreCollection.updateOne(filter, updateDoc, options);
  return result;
}

async function getUserScores(userId) {
  const query = { [userId]: { $exists: true } };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = await scoreCollection.find(query, options);
  return cursor.toArray();
}

module.exports = { addScore, getHighScores, getUserScores, addQuizScores };

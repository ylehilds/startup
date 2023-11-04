async function getScores() {
    const data = []
    const scores = await fetchScores()

    for (const [key, value] of Object.entries(scores)) {
        console.log(`${key}: ${value}`);
        data.push({
            username: value.username,
            scores: addScores(value.scores),
            date: value.lastUpdated ?? ''
        })
      }
      return data
    }

async function addScoresToTable() {
    const scores = await getScores();
    scores.sort((a, b) => b.scores - a.scores);
    const tableBody = document.getElementById('tableBody');
    scores.forEach((score, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <th scope="row">${index +1}</th>
            <td>${score.username}</td>
            <td>${score.scores}</td>
            <td>${score.date}</td>
        `;
        tableBody.appendChild(tr);
    });
}

function addScores(scores) {
    let totalScore = 0;
    scores.forEach(score => {
        totalScore += score.score;
    })
    return totalScore;
}

async function fetchScores() {
    const response = await fetch(`/api/scores`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    // Store what the service gave us as the high scores
    return await response.json(); // parses JSON response into native JavaScript objects 
  }

addScoresToTable()
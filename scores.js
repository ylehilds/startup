function getScores() {
    const users = JSON.parse(localStorage.getItem('users'));
    const data = [];
    users.forEach(user => {
        data.push({
            username: user.username,
            scores: addScores(user.scores),
            date: user.lastUpdated ?? ''
        })
        })
        return data
    }

function addScoresToTable() {
    const scores = getScores();
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

addScoresToTable()
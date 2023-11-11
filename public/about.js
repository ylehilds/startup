let socket

(async () => {
  const user = localStorage.getItem('user');
  if (!user) window.location.href = '/'
})();

function displayPicture() {
  const random = Math.floor(Math.random() * 1000);
  fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
    .then((response) => response.json())
    .then((data) => {
      const containerEl = document.querySelector('#picture');

      const width = containerEl.offsetWidth;
      const height = containerEl.offsetHeight;

      const imgUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}?grayscale`;
      const imgEl = document.createElement('img');
      imgEl.setAttribute('src', imgUrl);
      containerEl.appendChild(imgEl);
    });
}

function displayQuote() {
  fetch('https://api.quotable.io/random')
    .then((response) => response.json())
    .then((data) => {
      const containerEl = document.querySelector('#quote');

      const quoteEl = document.createElement('p');
      quoteEl.classList.add('quote');
      const authorEl = document.createElement('p');
      authorEl.classList.add('author');

      quoteEl.textContent = data.content;
      authorEl.textContent = data.author;

      containerEl.appendChild(quoteEl);
      containerEl.appendChild(authorEl);
    });
}

displayPicture();
displayQuote();



async function fetchQuote() {
  const httpResponse = await fetch('https://api.quotable.io/random');
  const jsonResponse = await httpResponse.json();
  console.log(jsonResponse);
  return jsonResponse
}

// Functionality for peer communication using WebSocket

function configureWebSocket() {
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  socket.onmessage = async (event) => {
    const data = JSON.parse(await event.data.text());
    displayMsg(data);
  };
}

async function fetchBroadcastQuote() {
  const data = await fetchQuote()
  displayMsg(data)
  broadcastEvent(data)
}

// setInterval(async function timeout() {
//   const data = await fetchQuote()
//     // Let other players know the quiz has concluded
//     broadcastEvent(data);
// }, 10000);

function displayMsg(data) {
  const chatText = document.querySelector('p.quote');
  chatText.textContent = data.content
  const author = document.querySelector('p.author');
  author.textContent = data.author
}

function broadcastEvent(data) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  } else {
    socket.addEventListener('open', () => {
      socket.send(JSON.stringify(data));
    });
  }
}

configureWebSocket()
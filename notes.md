# CS260 Notes
* Main Notes file (also points to other markdown files)
* I have learned how to resolve conflicts both from terminal as well as using VS code
* I have also learned how to use GitLens from VS code to visually see git changes
## SSH Login
* my ip address for CS260 class is: http://54.85.34.16
* the remote command to sign in is: ssh -i ~/keys/cs260/cs260.pem ubuntu@54.85.34.16
* AWS Route53 is where to purchase and regster a domain
## AWS linking ip address with domain name
* Crete an "A" record and give the public ipaddress. This is the root domain name and how you link/glue the website name and the public ip address. for example: cs260.click with value 18.224.126.40
* Create another "A" record for wildcard "*" meaning all subdomains will point to the root domain. for example: *.cs260.click with value 18.224.126.40
## Enabling HTTPS using Caddy 
* Caddy uses Let's Encrypt to generate a web certificate every time an HTTPS request is made for a domain name that Caddy doesn't have a web certificate for. When this happens Caddy asks Let's Encrypt to verify that the domain for the requested certificate is actually owned by the requester. Let's Encrypt does that by telling the requester to return a specific digitally signed response for a temporary URL when an HTTP request to the domain is made. Let's Encrypt then makes the HTTP request, and if successful, issues the certificate to the requester.
* Enabling https in Caddy consists of modifying its configuration file "Caddyfile". By not specifying a port the rule will serve up files using port 443 (HTTPS), and any request to port 80 will automatically redirect the browser to port 443. 
* If your domain name was myfunkychickens.click it would look like the following:
```
myfunkychickens.click {
   root * /usr/share/caddy
   file_server
   header Cache-Control no-store
   header -etag
   header -server
   }

startup.myfunkychickens.click {
   reverse_proxy * localhost:4000
   header Cache-Control no-store
   header -server
   header -etag
   header Access-Control-Allow-Origin *
}

simon.myfunkychickens.click {
   reverse_proxy * localhost:3000
   header Cache-Control no-store
   header -server
   header -etag
   header Access-Control-Allow-Origin *
}
```
* Restart Caddy so that your changes take effect. Note that since this requires you to use sudo to elevate your user to have the rights to restart the gateway.
```
sudo service caddy restart
```
* copy from local to server:
  ```
  scp -i <pem_file_location> <src_location_file> ubuntu@<public_ipaddress>:public_html/<either_leave_blank_or_rename_file>
  ```
* Startup Websockets potential & future implementation: motivational quotes and/or most popular receipes top 10.

## Deploy Files (the deploy script is different in each lab, so pay attention to that!)
* my ip address for CS260 class is: http://54.85.34.16
* the remote command to deploy is: ./deployFiles.sh -k ~/keys/cs260/cs260.pem -h quizmaker.click -s simon

## CSS Flexbox
* basic html page skeleton:
```html
<body>
  <header>
    <h1>CSS flex &amp; media query</h1>
  </header>
  <main>
    <section>
      <h2>Controls</h2>
    </section>
    <section>
      <h2>Content</h2>
    </section>
  </main>
  <footer>
    <h2>Footer</h2>
  </footer>
</body>
```
* basic styling:
```css
body {
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100vh;
}

header {
  flex: 0 80px;
  background: hsl(223, 57%, 38%);
}

footer {
  flex: 0 30px;
  background: hsl(180, 10%, 10%);
}

main {
  flex: 1;
  display: flex;
  flex-direction: row;
}
```

* media queries syntax:
```css
@media (orientation: portrait) {
  main {
    flex-direction: column;
  }
}

@media (max-height: 700px) {
  header {
    display: none;
  }
  footer {
    display: none;
  }
}
```

## CSS Frameworks
* Adding bootstrap:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
  </head>
  <body>
    ...
  </body>
</html>
```

```html
<body>
  ...

  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
    crossorigin="anonymous"
  ></script>
</body>
```


## CSS Practice
* Animation:
```css
p {
  text-align: center;
  font-size: 20vh;
}
```

```css
p {
  text-align: center;
  font-size: 20vh;

  animation-name: demo;
  animation-duration: 3s;
}
```

```css
@keyframes demo {
  from {
    font-size: 0vh;
  }

  to {
    font-size: 20vh;
  }
}
```

```css
@keyframes demo {
  from {
    font-size: 0vh;
  }

  95% {
    font-size: 21vh;
  }

  to {
    font-size: 20vh;
  }
}
```

## Startup CSS
* Adding toggle between dark and light themes in bootstrap:
```javascript
document.getElementById('flexSwitchCheckDefault').addEventListener('change', () => {
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light')
        document.querySelector('main').style.backgroundColor = 'LightGrey';
    } 
    else {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
        document.querySelector('main').style.backgroundColor = 'DarkSlateGrey';
    }
})
// the below line is to default the theme to dark
document.querySelector('main').style.backgroundColor = 'DarkSlateGrey';
```

* Basic CSS styling
```css
body {
  display: flex;
  flex-direction: column;
  min-width: 375px;
}

header {
  flex: 0 80px;
}

main {
  flex: 1 calc(100vh - 110px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-family: sans-serif;
}

footer {
  flex: 0 30px;
}

menu {
  flex: 1;
  display: flex;
  /*  overwrite Bootstrap so the menu does not wrap */
  flex-direction: row !important;
  list-style: none;
}

.navbar-brand {
  padding-left: 0.3em;
  border-bottom: solid rgb(182, 182, 182) thin;
}

menu .nav-item {
  padding: 0 0.3em;
}

footer a {
  float: right;
}

@media (max-height: 600px) {
  header {
    display: none;
  }
  footer {
    display: none;
  }
  main {
    flex: 1 100vh;
  }
}
```

## JavaScript object and classes
* Object-literals:
  * You can also declare a variable of object type with the object-literal syntax. This syntax allows you to provide the initial composition of the object.

```javascript
const obj = {
  a: 3,
  b: 'fish',
};
```

* Object functions:
  * Object has several interesting static functions associated with it. Here are some of the commonly used ones.


| Function | Meaning |
| ---- | --- |
| entries | Returns an array of key value pairs |
| keys | Returns an array of keys |
| values | Returns an array of values |

```javascript
const obj = {
  a: 3,
  b: 'fish',
};

console.log(Object.entries(obj));
// OUTPUT: [['a', 3], ['b', 'fish']]
console.log(Object.keys(obj));
// OUTPUT: ['a', 'b']
console.log(Object.values(obj));
// OUTPUT: [3, 'fish']
```


* Constructor:

```javascript
// Contructor

function Person(name) {
  return {
    name: name,
    log: function () {
      console.log('My name is ' + this.name);
    },
  };
}

const p = new Person('Eich');
p.log();
// OUTPUT: My name is Eich
```

* Classes:

```javascript
// Classes

class Person {
  constructor(name) {
    this.name = name;
  }

  log() {
    console.log('My name is ' + this.name);
  }
}

const p = new Person('Eich');
p.log();
// OUTPUT: My name is Eich
}
```


* Inheritance:

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  print() {
    return 'My name is ' + this.name;
  }
}

class Employee extends Person {
  constructor(name, position) {
    super(name);
    this.position = position;
  }

  print() {
    return super.print() + '. I am a ' + this.position;
  }
}

const e = new Employee('Eich', 'programmer');
console.log(e.print());
// OUTPUT: My name is Eich. I am a programmer
```


## Javascript Async/Await
* Using Javascript:

```javascript
const coinToss = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve(Math.random() > 0.5 ? 'heads' : 'tails');
      } else {
        reject('fell off table');
      }
    }, 1000);
  });
};

// then/catch chain version

coinToss()
  .then((result) => console.log(`Toss result ${result}`))
  .catch((err) => console.error(`Error: ${err}`))
  .finally(() => console.log(`Toss completed`));


// async, try/catch version

try {
  const result = await coinToss();
  console.log(`Toss result ${result}`);
} catch (err) {
  console.error(`Error: ${err}`);
} finally {
  console.log(`Toss completed`);
}  

// Fetch examples

// Promise

const httpPromise = fetch('https://simon.cs260.click/api/user/me');
const jsonPromise = httpPromise.then((r) => r.json());
jsonPromise.then((j) => console.log(j));
console.log('done');

// OUTPUT: done
// OUTPUT: {email: 'bud@mail.com', authenticated: true}

// Async/Await

const httpResponse = await fetch('https://simon.cs260.click/api/user/me');
const jsonResponse = await httpResponse.json();
console.log(jsonResponse));
console.log('done');

// OUTPUT: {email: 'bud@mail.com', authenticated: true}
// OUTPUT: done
```

## Document Object Model
* Accessing the DOM
  * Every element in an HTML document implements the DOM Element interface, which is derived from the DOM Node interface. The DOM Element Interface provides the means for iterating child elements, accessing the parent element, and manipulating the element's attributes. From your JavaScript code, you can start with the document variable and walk through the every element in the tree.

```javascript
function displayElement(el) {
  console.log(el.tagName);
  for (const child of el.children) {
    displayElement(child);
  }
}
displayElement(document);

// Another example:
// You can provide a CSS selector to the querySelectorAll function in order to select elements from the document. The textContent property contains all of the element's text. You can even access a textual representation of an element's HTML content with the innerHTML property.

const listElements = document.querySelectorAll('p');
for (const el of listElements) {
  console.log(el.textContent);
}
```

* Modifying the DOM
  * The DOM supports the ability to insert, modify, or delete the elements in the DOM. To create a new element you first create the element on the DOM document. You then insert the new element into the DOM tree by appending it to an existing element in the tree.

```javascript
function insertChild(parentSelector, text) {
  const newChild = document.createElement('div');
  newChild.textContent = text;

  const parentElement = document.querySelector(parentSelector);
  parentElement.appendChild(newChild);
}

insertChild('#courses', 'new course');

// To delete elements call the removeChild function on the parent element.

function deleteElement(elementSelector) {
  const el = document.querySelector(elementSelector);
  el.parentElement.removeChild(el);
}

deleteElement('#courses div');
```

* Injecting HTML
  * The DOM also allows you to inject entire blocks of HTML into an element. The following code finds the first div element in the DOM and replaces all the HTML it contains.
```javascript
const el = document.querySelector('div');
el.innerHTML = '<div class="injected"><b>Hello</b>!</div>';

//The example below shows how the img element can be used to launch an attack as soon as the page is loaded.

<img src="bogus.png" onerror="console.log('All your base are belong to us')" />

// If you are injecting HTML, make sure that it cannot be manipulated by a user. Common injection paths include HTML input controls, URL parameters, and HTTP headers. Either sanitize any HTML that contains variables, or simply use DOM manipulation functions instead of using innerHTML.
```

* Event Listeners
  * All DOM elements support the ability to attach a function that gets called when an event occurs on the element. These functions are called event listeners. Here is an example of an event listener that gets called when an element gets clicked.

```javascript
const submitDataEl = document.querySelector('#submitData');
submitDataEl.addEventListener('click', function (event) {
  console.log(event.type);
});
```
There are lots of possible events that you can add a listener to. This includes things like mouse, keyboard, scrolling, animation, video, audio, WebSocket, and clipboard events. You can see the full list on MDN. Here are a few of the more commonly used events.

| Event Category | Description |
| ---- | --- |
| Clipboard | Cut, copied, pasted |
| Focus | An element gets focus |
| Keyboard | Keys are pressed |
| Mouse | Click events |
| Text selection | When text is selected |


You can also add event listeners directly in the HTML. For example, here is a onclick handler that is attached to a button.

```javascript
<button onclick='alert("clicked")'>click me</button>
```

```javascript
"use strict";

const SevenSummits = [
  { name: "Everest", height: 8848, place: "Nepal" },
  { name: "Aconcagua", height: 6961, place: "Argentina" },
  { name: "Denali", height: 6194, place: "United States" },
  { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
  { name: "Elbrus", height: 5642, place: "Russia" },
  { name: "Vinson", height: 4892, place: "Antarctica" },
  { name: "Puncak Jaya", height: 4884, place: "Indonesia" }
];

const UtahCountySevenPeaks = [
  { name: "Timpanogos", height: 11750, quality: 4.8 },
  { name: "Santaquin", height: 10687, quality: 3.8 },
  { name: "Lone Peak", height: 11253, quality: 5 },
  { name: "Provo Peak", height: 11068, quality: 4.1 },
  { name: "Cascade", height: 10908, quality: 3.2 },
  { name: "Nebo", height: 11928, quality: 4.8 },
  { name: "Spanish Fork", height: 10192, quality: 3.4 }
];

const JazzMusic = [
  { title: "Take Five", artist: "Dave Brubeck", stars: 4.8 },
  { title: "So What", artist: "Miles Davis", stars: 3.8 },
  { title: "Take The A Train", artist: "Duke Ellington", stars: 4.2 },
  { title: "Round Midnight", artist: "Thelonious Monk", stars: 3.1 },
  { title: "My Favorite Things", artist: "John Coltrane", stars: 3.0 }
];

let currentData = SevenSummits;
let sortDirection = 1;

function table(data = SevenSummits) {
  if (!!data && data.length > 1) {
    currentData = data;
    const headers = parseHeader(data);
    const tableElement = generateTable(headers, data);

    const output = document.getElementById("output");

    removeAllChildNodes(output);
    output.appendChild(tableElement);
  } else {
    outputData("invalid input", data);
  }
}

function parseHeader(data) {
  let headers = [];
  for (const [key, value] of Object.entries(data[0])) {
    headers.push({ name: key, type: typeof value });
  }
  return headers;
}

function generateTable(headers, data) {
  const tableElement = document.createElement("table");
  tableElement.classList.add("a");

  addTableStyles(headers);

  generateHeader(headers, tableElement);
  generateRows(data, tableElement);

  return tableElement;
}

function generateHeader(headers, tableElement) {
  const rowElement = document.createElement("tr");
  tableElement.appendChild(rowElement);

  headers.forEach((header) => {
    const cellElement = document.createElement("th");
    rowElement.appendChild(cellElement);
    cellElement.setAttribute("onclick", `sortColumn(this)`);
    const textNode = document.createTextNode(header.name);
    cellElement.appendChild(textNode);
  });
}

function generateRows(data, tableElement) {
  data.forEach((dataRow) => {
    const rowElement = document.createElement("tr");
    tableElement.appendChild(rowElement);
    for (const [, value] of Object.entries(dataRow)) {
      const cellElement = document.createElement("td");
      rowElement.appendChild(cellElement);
      const textNode = document.createTextNode(value);
      cellElement.appendChild(textNode);
    }
  });
}

function addTableStyles(headers) {
  insertRule("#output table {border-collapse: collapse;}");
  insertRule("#output th,td {border: solid white thin;padding:.25em;}");
  insertRule(".selected {background: white; color:black;}");
  headers.forEach((header, index) => {
    if (header.type === "number") {
      insertRule(`#output tr td:nth-child(${index + 1}) {text-align:right;}`);
    }
  });
}

function insertRule(rule) {
  var sheet = window.document.styleSheets[0];
  sheet.insertRule(rule, sheet.cssRules.length);
}

function sortColumn(column) {
  sortDirection *= -1;
  const sortBy = column.innerText;
  const sortedData = currentData.sort(
    (a, b) => sortDirection * (a[sortBy] > b[sortBy] ? 1 : -1)
  );
  table(sortedData);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function outputData(title, data) {
  const output = document.getElementById("output");
  output.innerHTML = `<h3>${title}</h3><pre>${JSON.stringify(
    data,
    null,
    2
  )}</pre>`;
}
```

## Promises

JavaScript executes as a single threaded application. That means there is only ever one piece of code executing at the same time. However, the fact that it does not execute concurrently does not mean that it does not execute in parallel. You can asynchronously execute code with the use of a JavaScript Promise. Because the execution is asynchronous the promise object can be in one of three states at any given point in time.

1. pending - Currently running asynchronously
2. fulfilled - Completed successfully
3. rejected - Failed to complete

Example:

```javascript
const delay = (msg, wait) => {
  setTimeout(() => {
    console.log(msg, wait);
  }, 1000 * wait);
};

new Promise((resolve, reject) => {
  // Code executing in the promise
  for (let i = 0; i < 3; i++) {
    delay('In promise', i);
  }
});

// Code executing after the promise
for (let i = 0; i < 3; i++) {
  delay('After promise', i);
}

// OUTPUT:
//   In promise 0
//   After promise 0
//   In promise 1
//   After promise 1
//   In promise 2
//   After promise 2
```

### Resolving and Rejecting

Calling resolve sets the promise to the fulfilled state, and calling reject sets the promise to the rejected state.

Consider the following "coin toss" promise that waits ten seconds and then has a fifty percent chance of resolving or rejecting.

```javascript
const coinToss = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve('success');
    } else {
      reject('error');
    }
  }, 10000);
});  

// calling right away it gives the below output
console.log(coinToss);
// OUTPUT: Promise {<pending>}

// if you wait 10 seconds then you get the below output
console.log(coinToss);
// OUTPUT: Promise {<fulfilled>}

```

### Then, catch, finally
Modifying the previous example to also return head/tails and then chaining  them

```javascript
const coinToss = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.1) {
      resolve(Math.random() > 0.5 ? 'heads' : 'tails');
    } else {
      reject('fell off table');
    }
  }, 10000);
});
```

Chaining:
```javascript

coinToss
  .then((result) => console.log(`Coin toss result: ${result}`))
  .catch((err) => console.log(`Error: ${err}`))
  .finally(() => console.log('Toss completed'));

// OUTPUT:
//    Coin toss result: tails
//
```
### The observer pattern

Promises are the standard way to do asynchronous processing in JavaScript, but they are not the only way. The Observer pattern, popularized by web programming frameworks such as Angular, use a model called Observer. The major difference between Observers and Promises is that Promises immediately begin to execute when the Promise is created, but Observers form a pipeline that you then pass an execution object into. This allows Observers to be reused, and the result of executing an Observable to be saved as a history of a particular execution.


## Startup Javascript

### Local Storage
#### How to use LocalStorage
There are four main functions that can be used with localStorage.

| Function | Meaning |
| ---- | --- |
| setItem(name, value) | Sets a named item's value into local storage |
| getItem(name) | Gets a named item's value from local storage |
| removeItem(name) | Removes a named item from local storage |
| clear() | Clears all items in local storage |

A local storage value must be of type string, number, or boolean. If you want to store a JavaScript object or array, then you must first convert it to a JSON string with JSON.stringify() on insertion, and parse it back to JavaScript with JSON.parse() when retrieved.

Example:

```javascript
let user = 'Alice';

let myObject = {
  name: 'Bob',
  info: {
    favoriteClass: 'CS 260',
    likesCS: true,
  },
};

let myArray = [1, 'One', true];

localStorage.setItem('user', user);
localStorage.setItem('object', JSON.stringify(myObject));
localStorage.setItem('array', JSON.stringify(myArray));

console.log(localStorage.getItem('user'));
console.log(JSON.parse(localStorage.getItem('object')));
console.log(JSON.parse(localStorage.getItem('array')));

// Output

Alice
{name: 'Bob', info: {favoriteClass: 'CS 260', likesCS: true}
[1, 'One', true]

```

### Array

#### Find
```javascript

Using "find()" returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.

function isUserAlreadyExist(users, username) {
    return users.find(user => user.username == username)
}

function checkLogin(users) {
    let currentUser = users.find(user => user.isLoggedIn == true)
    if (currentUser != null) {
        signOut(users)
    }
}

Using "findIndex()" returns the index of the first element in an array that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned.

function signIn() {
    var usernameAction = document.getElementById("username").value
    var passwordAction = document.getElementById("password").value
    
    let users = localStorage.getItem("users")
    users = JSON.parse(users)
    let currentUser = users.find(user => user.username == usernameAction && user.password == passwordAction)
    if (currentUser != null) {
        checkLogin(users)
        let currentUserIndex = users.findIndex(user => user.username == usernameAction && user.password == passwordAction);
        if (currentUserIndex == -1) {
        alert("You are not logged in");
        return;
        }
        users[currentUserIndex].isLoggedIn = true;
        localStorage.setItem("users", JSON.stringify(users))
        window.location = "dashboard.html"
    }
    else {
        alert("Login failed")
    }
}


// Another great method for example for implementation covering get form values, create h3/ul/li/button create it in li tag, append it to questionList and finally reset the form and saving to localStorage

const questionForm = document.getElementById('question-form');
const questionList = document.getElementById('question-list');
const quizId = uuidv4();

questionForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const quizTitle = document.getElementById('quizTitle').value;
  const question = {
    question: document.getElementById('question').value,
    options: [
      document.getElementById('option1').value,
      document.getElementById('option2').value,
      document.getElementById('option3').value,
      document.getElementById('option4').value,
    ],
    answerIndex: parseInt(document.getElementById('answer').value.slice(-1)) - 1,
  };
  const li = document.createElement('li');
  li.innerHTML = `
    <h3>${question.question}</h3>
    <ul>
      <li>${question.options[0]}</li>
      <li>${question.options[1]}</li>
      <li>${question.options[2]}</li>
      <li>${question.options[3]}</li>
    </ul>
    <button class="delete-button">Delete</button>
  `;
  questionList.appendChild(li);
  const inputToSkip = document.getElementById('quizTitle');
  const currentValue = inputToSkip.value;
  document.getElementById('question-form').reset();
  inputToSkip.value = currentValue;
  saveQuestionToLocalStorage(question, quizId, quizTitle);
});


// Another great method for example for implementation covering the displaying of questions loaded from localStorage previously, loops the questions, creating li tags with data from questions, append li tag to questionList with a save/cancel buttons, add Add button that generates code to add a question or cancel, it is also dealing with adding click events for each button.

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
    addButton.style.width = '40%';
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
        optionInputs[0].setSelectionRange(0, optionInputs[0].value.length);
        editContainer.querySelector('.save-button').addEventListener('click', () => {
            if (questionInput.value === '' || optionInputs[0].value === '' || optionInputs[1].value === '' || optionInputs[2].value === '' || optionInputs[3].value === '') {
                alert('Please fill in all fields.');
                return
            }
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

```

### PlaceHolder for websocket

```javascript
  setInterval(() => {
    const score = Math.floor(Math.random() * 3000);
    const chatText = document.querySelector('#players-actions ul');
    chatText.innerHTML =
      `<li class="list-group-item"><span class="player-event">Eich</span> scored ${score}</div>` + chatText.innerHTML;
  }, 5000);
```

### The scoreboard loads the users scores, adding totalScore, sorts the highest score before it displays on the table.
```javascript
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
```




-----------------------------------------------------------------------------
// MD helper

## Section Topic
* Section X

```javascript

```

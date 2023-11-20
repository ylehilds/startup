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

## Midterm Study Guide
```javascript
CS260 Midterm study guide?

https://byu.instructure.com/courses/21001/pages/midterm-study-guide?module_item_id=1727814
https://github.com/webprogramming260/.github/blob/main/profile/test/midterm.md

Midterm study guide
The midterm will cover all topics from the start of class until the end of the JavaScript instruction. Here are the details:
	•	The test is available online with Canvas during the open dates.
	•	The test must be taken during the open dates. Consult Canvas for open dates. No late days.
	•	Multiple choice format.
	•	There is no time limit.
	•	The average time to take the test is less than 60 minutes.
	•	You may view any notes that you have placed in your Startup repository notes.md file during the test. No other external notes, websites, content, programs, utilities, tools, or other people may be used or referenced.
	•	The test focuses on general knowledge of the primary topics. You will need to know the basic syntax and usage of the languages and protocols of interest. This includes, but is not limited to, topics such as HTTP, console commands, DNS, HTML, CSS, and JavaScript.
	•	It is highly suggested that you attend, or view, the class review session.

https://byu.instructure.com/courses/21001/pages/midterm-study-guide?module_item_id=1727814


The following questions are examples of what you may see on the midterm exam:
	0.	In the following code, what does the link element do?
	stylesheet, it will format the HTML document according to the information in the style sheet.
	0.	In the following code,  what does a div tag do?
	it is a piece of code in the Dom, a child/leaf  
	0.	In the following code, what is the difference between the #title and .grid selector?
	#title It is an id for an element, where the .grid is a class that could be applied to many elements
	0.	In the following code, what is the difference between padding and margin?
	
padding and margin are two different properties that affect the spacing around an element.
padding is the space between the element's content and its border. It's used to add space inside the element, and it doesn't affect the element's size or position. You can set the padding property using the padding shorthand or the individual padding-top, padding-right, padding-bottom, and padding-left properties.
margin is the space between the element's border and the adjacent elements. It's used to add space outside the element, and it can affect the element's size and position. You can set the margin property using the margin shorthand or the individual margin-top, margin-right, margin-bottom, and margin-left properties.
In summary, padding affects the space inside an element, while margin affects the space outside an element.


	0.	Given this HTML and this CSS how will the images be displayed using flex?
	In CSS, you can use Flexbox (Flexible Box Layout) to create flexible and responsive layouts for displaying images (or any other content) in a web page. Flexbox allows you to distribute space and align items within a container, making it a powerful tool for creating various types of layouts.

	0.	What does the following padding CSS do?

In CSS, the padding property is used to control the space between the content of an element and its border. It adds space inside the element but outside of the border. Padding is used to create space and separation between the content and the border of an element.
The padding property can be applied to various HTML elements, such as divs, paragraphs, headings, and more. It can be set for individual sides (top, right, bottom, left) or as a single value to apply the same padding to all sides.

element {
  padding: 20px; /* Applies 20 pixels of padding to all sides */
}

Padding is often used to create spacing and improve the visual presentation of elements on a web page. It's particularly useful for creating margins around content within a container, giving it room to breathe and separating it from neighboring elements. The space added by padding is part of the element's total dimensions but doesn't affect the layout of adjacent elements.

	0.	What does the following code using arrow syntax function declaration do?

In JavaScript, an arrow function declaration, also known as an arrow function expression, is a concise way to create functions. Arrow functions were introduced in ECMAScript 6 (ES6) and provide a shorter syntax for writing functions compared to traditional function expressions. Arrow functions have a few important characteristics:
	•			Shorter Syntax: Arrow functions have a more compact syntax, which is especially useful for simple functions.
	•			Lexical this: Arrow functions do not have their own this context. They inherit the this value from their enclosing (surrounding) context. This can be particularly useful in certain situations where the this context is important.

const functionName = (parameters) => {
  // Function body
  return result; // (optional) You can omit the return statement for a single expression.
};

const add = (a, b) => a + b;
console.log(add(2, 3)); // Output: 5



	0.	What does the following code using map with an array output?

in JavaScript, the map method is used with arrays to create a new array by applying a provided function to each element of the original array. The map function iterates through each element in the array, applies the given function to each element, and collects the results into a new array. This is particularly useful for transforming the data in an array without modifying the original array. The original array remains unchanged.
Here's the basic syntax of the map method:

const newArray = array.map((currentValue, index, array) => {
  // Return a new value based on currentValue
});

———————— another example——————————
const numbers = [1, 2, 3, 4, 5];

const doubledNumbers = numbers.map((number) => {
  return number * 2;
});

console.log(doubledNumbers); // Output: [2, 4, 6, 8, 10]


	0.	What does the following code output using getElementByID and addEventListener?

getElementById:
The getElementById method is used to select and retrieve a specific HTML element from the DOM based on its unique id attribute. It returns a reference to the selected element, allowing you to manipulate or retrieve information from that element.

const divElement = document.getElementById("myDiv");
console.log(divElement.textContent); // Output: "This is a div element."


addEventListener:
The addEventListener method is used to attach an event listener to a DOM element. It allows you to define a function that will be executed when a specific event occurs on the element.

Example:

<button id="myButton">Click Me</button>

const buttonElement = document.getElementById("myButton");

buttonElement.addEventListener("click", () => {
  console.log("Button clicked!");
});


	0.	What does the following line of Javascript do using a # selector?

In JavaScript, a "#" selector is not used directly in the language. Instead, "#" is primarily associated with CSS (Cascading Style Sheets) to select elements by their HTML id attribute. The "#" character is used as part of a CSS selector to target a specific element with a unique identifier.

In this CSS code, #myElement is a selector that targets an HTML element with the id attribute set to "myElement." This allows you to apply specific styling to that particular element.
In JavaScript, if you want to work with elements selected using a "#" selector in CSS, you typically don't use "#" directly in your JavaScript code. Instead, you can select the element using the getElementById

	0.	Which of the following are true? (mark all that are true about the DOM)

In JavaScript, the DOM stands for Document Object Model. The Document Object Model is a programming interface and representation of a web page's structure, content, and properties. It provides a way for JavaScript to interact with and manipulate web pages in a structured and programmatic manner.
Key points about the DOM:
	•			Tree-Like Structure: The DOM represents the web page as a hierarchical tree-like structure, where each element, attribute, and text content is an object that can be accessed, modified, or manipulated using JavaScript.
	•			Live and Dynamic: The DOM is dynamic and "live," meaning it reflects the current state of the web page. Any changes made to the DOM are immediately reflected in the web page's appearance and behavior.
	•			Browser API: The DOM is provided by web browsers as a built-in API that JavaScript can access and utilize. It allows JavaScript to interact with HTML and XML documents.
	•			HTML and XML Documents: While it is most commonly associated with HTML documents, the DOM can also be used with XML documents. Each element in the document is represented as a node in the DOM.
	•			Accessing and Manipulating Elements: JavaScript can use DOM methods and properties to access, modify, or create elements and their attributes, change the content of elements, and respond to user events (e.g., clicks, keypresses).

The DOM allows JavaScript to create interactive and dynamic web pages by providing a structured way to access and manipulate the elements and content of a document. It serves as a bridge between the web page and the JavaScript code, enabling developers to build web applications with rich user interfaces and behavior.

	0.	By default, the HTML span element has a default CSS display property value of: 

The default CSS `display` property value for the HTML `<span>` element is `inline`. This means that, by default, a `<span>` element is rendered inline within the flow of the surrounding text or content. It does not introduce line breaks before or after itself and only occupies as much width as its content requires.

You can change the `display` property to other values like `block`, `inline-block`, or `inline-flex` to alter how the `<span>` element is rendered and how it interacts with other elements on the page. The choice of `display` value depends on your layout and design requirements.

	0.	How would you use CSS to change all the div elements to have a background color of red?

To change the background color of all <div> elements to red using CSS, you can use the following CSS rule:
div {
  background-color: red;
}


	0.	How would you display an image with a hyperlink in HTML?

To display an image with a hyperlink (an image that, when clicked, takes the user to another web page), you can use the <a> (anchor) element to create the hyperlink and include an <img> (image) element within it. Here's the basic HTML structure:
<a href="URL_of_the_destination_page">
  <img src="URL_of_the_image" alt="Image Description">
</a>


	0.	In the CSS box model, what is the ordering of the box layers starting at the inside and working out?

In the CSS box model, there are multiple layers or components that make up the structure of an element's layout. These layers start from the inside and work their way out. The box model layers, in order from the innermost to the outermost, are as follows:

1. **Content**: This is the innermost layer, and it represents the actual content of the element. It includes the text, images, or other media contained within the element.

2. **Padding**: The padding is the space between the content and the element's border. It is defined using the `padding` property in CSS and can vary for each side (top, right, bottom, left) of the element. Padding adds space around the content.

3. **Border**: The border is the next layer outside of the padding. It is defined using the `border` property in CSS and can include properties like width, style, and color. The border surrounds the padding and content.

4. **Margin**: The margin is the outermost layer, and it represents the space between the border of the element and any neighboring elements. It is defined using the `margin` property in CSS and can also vary for each side (top, right, bottom, left) of the element. Margins create space between the element and its neighboring elements.

Here's a visual representation of the layers in the CSS box model:

```
------------------------------  (Margin)
|                			       |
|   -----------------   	   |  (Border)
|   |               |			   |
|   |   Content   	|	       |   (Padding)
|   |               |			   |
|   -----------------        |
|                       	   |
------------------------------
```

Understanding the box model and how these layers interact is crucial for controlling the layout and spacing of elements on a web page. It's important to keep in mind that the dimensions of an element, including its content, padding, border, and margin, collectively determine its overall size and positioning in the layout.

	0.	Given the following HTML, what CSS would you use to set the text "troubl" to green and leave the "double" text unaffected?
	…
	0.	What will the following code output when executed using a for loop and console.log?

	…
	0.	How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?


To select an element with the id of "byu" and change the text color of that element to green using JavaScript, you can follow these steps:
	•			Identify the HTML element with the id attribute set to "byu."
	•			Use JavaScript to select that element.
	•			Set the style.color property of the selected element to "green."

<div id="byu">This is the element to change text color.</div>
// Select the element by its id
const byuElement = document.getElementById("byu");

// Change the text color to green
byuElement.style.color = "green";


	0.	What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?

	•			Paragraph: <p>
	•			Ordered List: <ol>
	•			Unordered List: <ul>
	•			Second-level Heading (Heading 2): <h2>
	•			First-level Heading (Heading 1): <h1>
	•			Third-level Heading (Heading 3): <h3>

	0.	How do you declare the document type to be html?

To declare the document type (DOCTYPE) for an HTML document as HTML5, you can include the following declaration at the very beginning of your HTML document:
<!DOCTYPE html>

This declaration tells the browser that the document is an HTML5 document. HTML5 is the latest version of HTML and is widely used for creating modern web pages. It's important to include this declaration at the beginning of your HTML document to ensure that the browser renders your page correctly and follows HTML5 standards.


	0.	What is valid javascript syntax for if, else, for, while, switch statements?

Certainly, here's the valid JavaScript syntax for `if`, `else`, `for`, `while`, and `switch` statements:

1. `if` statement:

```javascript
if (condition) {
  // Code to execute if the condition is true
} else if (anotherCondition) {
  // Code to execute if another condition is true
} else {
  // Code to execute if no condition is true
}
```

2. `for` loop:

```javascript
for (initialization; condition; increment/decrement) {
  // Code to execute in each iteration
}
```

3. `while` loop:

```javascript
while (condition) {
  // Code to execute as long as the condition is true
}
```

4. `switch` statement:

```javascript
switch (expression) {
  case value1:
    // Code to execute if expression equals value1
    break;
  case value2:
    // Code to execute if expression equals value2
    break;
  default:
    // Code to execute if expression doesn't match any case
}
```

These are the basic structures of the control flow statements in JavaScript. You can use these statements to control the flow of your code, make decisions, loop through data, and switch between different code blocks based on specific conditions. Remember to replace "condition," "expression," "value1," "value2," and the code comments with the actual logic and values that are relevant to your specific use case.


	0.	What is the correct syntax for creating a javascript object?

In JavaScript, you can create an object using two primary syntax styles: object literal notation and constructor notation. Here's the correct syntax for both methods:

1. **Object Literal Notation**:

   Object literal notation is the most common way to create objects in JavaScript. It involves defining the object's properties and values directly within curly braces `{}`.

   ```javascript
   // Creating an object using object literal notation
   const person = {
     firstName: "John",
     lastName: "Doe",
     age: 30,
   };
   ```

2. **Constructor Notation**:

   You can also create objects using constructor functions. A constructor function is a regular JavaScript function that is used to construct and initialize objects.

   ```javascript
   // Creating an object using constructor notation
   function Person(firstName, lastName, age) {
     this.firstName = firstName;
     this.lastName = lastName;
     this.age = age;
   }

   const person = new Person("John", "Doe", 30);
   ```

   In this example, `Person` is a constructor function, and you create a `person` object by using the `new` keyword to instantiate the constructor function.

Both methods allow you to define and work with objects in JavaScript. Object literal notation is more concise and is commonly used for simple objects, while constructor notation can be useful for creating multiple objects with similar structures, especially when you need to include methods as well.



	0.	Is is possible to add new properties to javascript objects?

Yes, it is possible to add new properties to JavaScript objects. JavaScript objects are dynamic, meaning you can add, modify, or delete properties at any time, even after the object has been created. Here's how you can add new properties to an existing object:

	0.	If you want to include JavaScript on an HTML page, which tag do you use?

To include JavaScript on an HTML page, you can use the <script> tag. The <script> tag is used to embed or reference JavaScript code within an HTML document
line JavaScript: You can include JavaScript code directly within the HTML document using the <script> tag in the <head> or <body> section.
External JavaScript File: You can also link to an external JavaScript file using the src attribute of the <script> tag. This is a common practice for organizing and separating your JavaScript code from your HTML content.

	0.	Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?

<p>My favorite animal is a <span id="animal">animal</span>, and I also like to go fishing for <span id="fish">fish</span>.</p>
// Select the element with the id "animal"
const animalElement = document.getElementById("animal");

// Change the text content of the selected element
animalElement.textContent = "crow";


	0.	Which of the following correctly describes JSON?

JSON is a lightweight data interchange format that is used for data storage and exchange between a server and a client or between different parts of an application. It is often used in web development and is designed to be easy for both humans to read and write and for machines to parse and generate.
Key characteristics of JSON include:
	•	Text-Based: JSON data is represented as plain text, making it easy to read and write for both developers and machines.
	•	Data Structure: JSON is a structured data format, typically consisting of key-value pairs, where data is organized in a way similar to JavaScript objects.
	•	Common Data Types: JSON supports various data types, including strings, numbers, objects, arrays, booleans, and null.
	•	Widely Supported: JSON is supported by many programming languages and can be used in various contexts, making it an ideal choice for data exchange and configuration files.
	•	Human-Readable: JSON data is easy for humans to read and understand, which is a significant advantage for debugging and configuration.
	•	Lightweight: JSON is minimalistic in its design, making it efficient in terms of data size and transfer.
	•	Language-Agnostic: JSON is not tied to any specific programming language and can be used in a wide range of contexts.
In summary, JSON is a widely used data format that facilitates data exchange and storage in a human-readable, lightweight, and language-agnostic manner. It is often used in web development, APIs, and data transmission between systems.


	0.	What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo  do?

	•			chmod: Change file permissions. It is used to modify the access permissions of files and directories.
	•			pwd: Print Working Directory. It displays the current directory path where you are located in the file system.
	•			cd: Change Directory. It is used to change your current working directory.
	•			ls: List files and directories. It shows the contents of the current directory.
	•			vim: A text editor. It is a powerful and efficient command-line text editor.
	•			nano: Another text editor. It's a more user-friendly and straightforward command-line text editor.
	•			mkdir: Make Directory. It's used to create new directories (folders).
	•			mv: Move or rename files and directories. It can be used to move a file from one location to another or rename files.
	•			rm: Remove files or directories. It is used to delete files or directories. Be cautious, as it is not easily reversible.
	•			man: Manual pages. It displays manual pages (documentation) for various commands. For example, man ls shows the manual for the ls command.
	•			ssh: Secure Shell. It is used to securely connect to remote servers or systems over a network.
	•			ps: Process Status. It lists the currently running processes on the system.
	•			wget: Web Get. It is a command-line tool for downloading files from the internet.
	•			sudo: Superuser Do. It is used to execute commands with superuser (administrator) privileges. It's often required for system administration tasks.

	0.	Which of the following console command creates a remote shell session?

the one that creates a remote shell session is ssh (Secure Shell). The ssh command is used to securely connect to a remote server or system over a network and access a shell session on that remote machine. It allows you to log in remotely and execute commands on a remote server while encrypting the communication to maintain security and privacy.
ssh username@remote_server


	0.	Which of the following is true when the -la parameter is specified for the ls console command?

When the `-la` parameter is specified for the `ls` console command, it modifies the behavior of the `ls` command in Unix-like operating systems (such as Linux and macOS) as follows:

1. `-l`: This option stands for "long format." It causes `ls` to display additional details about each file or directory, including file permissions, owner, group, file size, modification date, and file/directory name.

2. `-a`: This option stands for "all." It instructs `ls` to show hidden files and directories as well. Hidden files and directories in Unix-like systems are those that start with a dot (e.g., `.examplefile` or `.exampledirectory`). By default, the `ls` command does not display hidden files and directories.

So, when you run `ls -la`, it will display a detailed listing of all files and directories in the current directory, including hidden files and directories. This is often used for a comprehensive view of the contents of a directory when exploring or managing files.


	0.	Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?

A domain name is simply a text string that follows a specific naming convention and is listed in a special database called the domain name registry.
Domain names are broken up into a root domain, with one or more possible subdomain prefixes. The root domain is represented by a secondary level domain and a top level domain. The top level domain (TLD) represent things like com, edu, or click. So a root domain would look something like byu.edu, google.com, or cs260.click. The possible list of TLDs is controlled by ICANN, one of the governing boards of the internet.

The owner of a root domain can create any number of subdomains off the root domain. Each subdomain may resolve to a different IP address. So the owner of cs260.click can have subdomains for travel (travel.cs260.click), finance (finance.cs260.click), or a blog (blog.cs260.click).

In the question case here is the following:
top level domain: click
subdomain: banana.fruit
root domain: bozo.click
Domain name: banana.fruit.bozo.click

	0.	Is a web certificate is necessary to use HTTPS.

Yes, a web certificate, specifically an SSL/TLS certificate, is necessary to use HTTPS (Hypertext Transfer Protocol Secure) on a website.

	0.	Can a DNS A record can point to an IP address or another A record.


A DNS A record (Address record) is used to map a domain or subdomain to an IPv4 address. It cannot directly point to another A record. However, you can achieve a similar effect by pointing a CNAME (Canonical Name) record to another A record.

Here's a breakdown of how you can use these records:

1. **A Record**: A DNS A record maps a domain or subdomain to a specific IPv4 address. For example, you can create an A record like this:

   ```
   example.com. IN A 192.168.1.1
   ```

   This maps "example.com" to the IPv4 address 192.168.1.1.

The DNS database records that facilitate the mapping of domain names to IP addresses come in several flavors. The main ones we are concerned with are the address (A) and the canonical name (CNAME) records. An A record is a straight mapping from a domain name to IP address. A CNAME record maps one domain name to another domain name. This acts as a domain name alias. You would use a CNAME to do things like map byu.com to the same IP address as byu.edu so that either one could be used.

2. **CNAME Record**: A DNS CNAME record allows you to create an alias for a domain or subdomain. It can point to another domain or subdomain (which may have an associated A record). For example:

   ```
   alias.example.com. IN CNAME original.example.com.
   ```

   In this case, "alias.example.com" is an alias for "original.example.com," which may have an associated A record pointing to an IPv4 address. This way, "alias.example.com" indirectly points to an IPv4 address through "original.example.com."

While CNAME records can point to other domain names, they don't directly map to IPv4 addresses like A records. Typically, A records are used to map domains directly to IP addresses, while CNAME records are used for aliasing and redirection.


	0.	Port 443, 80, 22 is reserved for which protocol?

Port 443, 80, and 22 are reserved for specific network protocols as follows:

1. **Port 443**: Port 443 is reserved for the HTTPS (Hypertext Transfer Protocol Secure) protocol, which is used for secure web communication. When you visit a website using HTTPS, data is transmitted over this port, and it's encrypted to ensure a secure connection.

2. **Port 80**: Port 80 is reserved for the HTTP (Hypertext Transfer Protocol) protocol, which is used for standard, non-secure web communication. When you visit a website using HTTP, data is transmitted over this port without encryption.

3. **Port 22**: Port 22 is reserved for the SSH (Secure Shell) protocol, which is used for secure remote access to computer systems and secure file transfers. It provides encrypted communication for secure administration and secure file transfers.

These port numbers are well-known and standardized across the internet to ensure consistency and compatibility for various network services and applications.


	0.	What will the following code using Promises output when executed?
```

## Some MongoDB methods & syntax:

```javascript
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
```

## Startup Login
* Login with cookies and important methods

```javascript

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.userId)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.userId, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    delete user.password // Don't send the password hash to the client
    res.send(user)
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.userId);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      delete user.password // Don't send the password hash to the client
      res.send(user);
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// getMe for the currently authenticated user
app.get('/user/me', async (req, res) => {
  authToken = req.cookies['token'];
  const user = await DB.getUserByToken(authToken)
  if (user) {
    res.send({ userId: user.userId });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:userId', async (req, res) => {
  const user = await DB.getUser(req.params.userId);
  if (user) {
    const token = req?.cookies.token;
    res.send({ userId: user.userId, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

* The middleware called "secureApiRouter" above is extremely important to protect the API if the user is not logged in
```


## Startup Websockets
* Nice simple methods to get websockets working:

```javascript

const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
  // Create a websocket object
  const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  // Keep track of all the connections so we can forward messages
  let connections = [];

  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);

    // Forward messages to everyone except the sender
    ws.on('message', function message(data) {
      connections.forEach((c) => {
        if (c.id !== connection.id) {
          c.ws.send(data);
        }
      });
    });

    // Remove the closed connection so we don't try to forward anymore
    ws.on('close', () => {
      connections.findIndex((o, i) => {
        if (o.id === connection.id) {
          connections.splice(i, 1);
          return true;
        }
      });
    });

    // Respond to pong messages by marking the connection alive
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // Keep active connections alive
  setInterval(() => {
    connections.forEach((c) => {
      // Kill any connection that didn't respond to the ping last time
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);
}

module.exports = { peerProxy };

* On the client make sure you open/send messages when websocket already has an opened connection like this:

// Functionality for peer communication using WebSocket

function configureWebSocket() {
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  socket.onopen = (event) => {
    displayMsg('system', 'quiz', 'connected');
  };
  socket.onclose = (event) => {
    displayMsg('system', 'quiz', 'disconnected');
  };
  socket.onmessage = async (event) => {
    const msg = JSON.parse(await event.data.text());
    if (msg.type === QuizEndEvent) {
      displayMsg('player', msg.from, `scored ${msg.value}`);
    } else if (msg.type === QuizStartEvent) {
      displayMsg('player', msg.from, `started a new quiz`);
    }
  };
}

function displayMsg(cls, from, msg) {
  const chatText = document.querySelector('#players-actions ul');
  chatText.innerHTML =
    `<li class="list-group-item"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
}

function broadcastEvent(from, type, value) {
  const event = {
    from: from,
    type: type,
    value: value,
  };
  
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(event));
  } else {
    socket.addEventListener('open', () => {
      socket.send(JSON.stringify(event));
    });
  }
}

```


## Startup React
* Create view components

We now create React component files login.jsx, play.jsx, scores.jsx, and about.jsx to represent each of the application views. To begin with, these are just stubs that we will populate as we move functionality from the old js files into the jsx components. We place each of the stubbed components in a separate directory (e.g. src/login/login.jsx) so that we can keep all of the component files together.

Here is the login.jsx stub before any code is converted over. The other components are similar.

```javascript
import React from 'react';

export function Login() {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div>login displayed here</div>
    </main>
  );
}
```
Create the router

With app.jsx containing the header and footer, and all the application view component stubs created, we can now create the router that will display each component as the navigation UI requests it. The router controls the whole application by determining what component to display based upon what navigation the user chooses. To implement the router, we import the router component into the App component, and wrap all of the App component's elements with the BrowserRouter component. We also import all of our view components.

```javascript
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { About } from './about/about';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <div className='body bg-dark text-light'><!-- sub-elements here --></div>
  </BrowserRouter>
);
```
Navigating routes

We then we replace the a elements with the router's NavLink component. The anchor element's href attribute is replaced with the router's to attribute. The NavLink component prevents the browser's default navigation functionality and instead handles it by replacing the currently displayed component.

```javascript
<a className="nav-link" href="play.html">Play</a>

// to

<NavLink className='nav-link' to='play'>Play</NavLink>
The nav element's code now looks like the following.

<nav className='navbar fixed-top navbar-dark'>
  <div className='navbar-brand'>
    Simon<sup>&reg;</sup>
  </div>
  <menu className='navbar-nav'>
    <li className='nav-item'>
      <NavLink className='nav-link' to=''>
        Login
      </NavLink>
    </li>
    <li className='nav-item'>
      <NavLink className='nav-link' to='play'>
        Play
      </NavLink>
    </li>
    <li className='nav-item'>
      <NavLink className='nav-link' to='scores'>
        Scores
      </NavLink>
    </li>
    <li className='nav-item'>
      <NavLink className='nav-link' to='about'>
        About
      </NavLink>
    </li>
  </menu>
</nav>
```
Injecting the routed component

The router definitions are then inserted so that the router knows what component to display for a given path. The router changes the rendered component; it appears in the place of the Routes element. The Routes element replaces the main element in the component HTML.

```javascript
 <main>App components go here</main>

 // to

<Routes>
  <Route path='/' element={<Login />} exact />
  <Route path='/play' element={<Play />} />
  <Route path='/scores' element={<Scores />} />
  <Route path='/about' element={<About />} />
  <Route path='*' element={<NotFound />} />
</Routes>
```

Notice that the * (default matcher) was added to handle the case where an unknown path is requested. We handle this by creating a component for a path that is not found. We place this component at the bottom of our src/app.jsx file.

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
At this point the application should support navigating to the different components. When you reach this point with your startup, make sure that you commit your changes.


* Scores conversion from scratch to React

Converting to React components

The code for each of the HTML pages needs to now be converted to the different React components. Each of the components is a bit different, and so you want to review them to determine what they look like as a React component.

The basic steps for converting the component include the following.

Copy the main element HTML over and put it in the return value of the component. Don't copy the header and footer HTML since they are now represented in app.jsx.
Rename the class to className so that it doesn't conflict with the JavaScript keyword class.
Copy the JavaScript over and turn the functions into inner functions of the React component.
Move the CSS over to the component directory and use an import statement to bring it into the component's jsx file.
Create React state variables for each of the stateful objects in the component.
Replace DOM query selectors with React state variables.
Move state up to parent components as necessary. For example, authentication state, or user name state.
Create child components as necessary. For example, a SimonGame and SimonButton component.
In order for you to have a feel for how this is done we will demonstrate how this is done with the Scores component.

Convert Scores component

js:
```javascript
import React from 'react';
import './scores.css';

export function Scores() {
  const [scores, setScores] = React.useState([]);

  function addScores(scores) {
    let totalScore = 0;
    scores.forEach(score => {
      totalScore += score.score;
    })
    return totalScore;
  }

  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  React.useEffect(() => {
    fetch('/api/scores')
      .then((response) => response.json())
      .then((scores) => {

        const data = []
        for (const [key, value] of Object.entries(scores)) {
          console.log(`${key}: ${value}`);
          data.push({
            username: value.username,
            scores: addScores(value.scores),
            date: value.lastUpdated ?? ''
          })
        }

        setScores(data);
        localStorage.setItem('scores', JSON.stringify(data));
      })
      .catch(() => {
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
          setScores(JSON.parse(scoresText));
        }
      });
  }, []);

  // sort scores
  scores.sort((a, b) => b.scores - a.scores);

  // Demonstrates rendering an array with React
  const scoreRows = [];
  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      scoreRows.push(
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{score.username}</td>
          <td>{score.scores}</td>
          <td>{score.date}</td>
        </tr>
      );
    }
  } else {
    scoreRows.push(
      <tr key='0'>
        <td colSpan='4'>Be the first to score</td>
      </tr>
    );
  }

  return (
    <main className="container-fluid text-center">
      <table className="table table-striped table-bordered table-hover">
        <caption>List of scores</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Score</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        {/* <tbody id="tableBody"></tbody> */}
        <tbody id='scores'>{scoreRows}</tbody>
      </table>
    </main>
  );
}
```
css:
```css
td {
  max-width: 40vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

main {
  align-items: center; 
  justify-content: space-around;
}
```

-----------------------------------------------------------------------------
// MD helper

## Section Topic
* Section X

```javascript

```

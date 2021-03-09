//
// set  query + select
const set = (e) => document.querySelector(e);
const newEl = (e) => document.createElement(e);
// set element
const todoForm = set('.todoForm');
const todoInput = set('.todoInput');
const todoList = set('.todoList');

// the storge
let myData = [];

// add an eventListener to  form, and listen for submit event
todoForm.addEventListener('submit', function (event) {
  // prevent the page from reloading when submitting the form
  event.preventDefault();
  addTodo(todoInput.value); // call addTodo function with input box current value
});
// function to add todo
function addTodo(userInput) {
  // if item is not empty

  if (userInput !== '') {
    const todo = {
      id: Date.now(),
      task: userInput,
      completed: false,
    };

    // add the tesk to 'myData' array
    myData.push(todo);
    addToLocalStorage(myData);
    //clear the input
    todoInput.value = '';
  }
}
//
// function to add to the list
function appendTodo(myData) {
  //reset the ul first!! importent
  todoList.innerHTML = '';
  myData.forEach((myData) => {
    const checked = myData.completed ? 'checked' : null;
    const li = newEl('li');
    li.setAttribute('class', 'task');
    li.setAttribute('data-key', myData.id);
    if (myData.completed === true) {
      li.classList.add('checked');
    }
    li.innerHTML = ` 
        <input type="checkbox" class="checkbox" ${checked}>
        ${myData.task}
        <button class="delBtn">X</button>
        `;
    todoList.append(li);
  });
}
//
//local storage
function addToLocalStorage(myData) {
  //first convert the array to string(stringify) then store it
  localStorage.setItem('myData', JSON.stringify(myData));
  appendTodo(myData);
}

function getFromLocalStorage() {
  const getItem = localStorage.getItem('myData');

  if (getItem) {
    // converts back to array and store it in todos array
    myData = JSON.parse(getItem);
    appendTodo(myData);
  }
}
// toggle the value to completed and not completed
//toggle =add/remove over again
function toggle(id) {
  myData.forEach(function (item) {
    //
    if (item.id == id) {
      // toggle the value
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(myData);
}
// deletes a todo from the array, then updates localstorage and updated list to screen
function deleteTodo(id) {
  // li.classList.add('fall');
  // filters out the <li> with the id and updates the array
  myData = myData.filter(function (item) {
    return item.id != id;
  });

  // update the localStorage
  addToLocalStorage(myData);
}
getFromLocalStorage();

todoList.addEventListener('click', function (event) {
  // check if the event is on checkbox
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
    console.log(event.target.parentElement.getAttribute('data-key'));
  }

  // check if that is a delete-button
  if (event.target.classList.contains('delBtn')) {
    // const li = document.querySelector('li');
    // li.classList.add('fall');
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});
// localStorage.clear();

// --- Start of To-Do List --- //

const Add = document.getElementById('add');
const inputField = document.getElementById('todo');
const message = document.getElementById('message-area');
const listContainer = document.getElementById('list-content-container');

// Load tasks from localStorage on page load
window.addEventListener('DOMContentLoaded', loadTasks);

Add.addEventListener('click', () => {
  const input = inputField.value.trim();
  
  if(!input) {
    displayMessage('Please fill in some text in the field!','danger');
    return;
  } 

  addTask(input);
  saveTask(input);
  inputField.value = '';

  displayMessage('Your text has been added to your Task!','success');
});
// -- End of Add Button Handle-- //

// -- addTask function -- //
function addTask(task){
  listContainer.style.display = 'flex';

  const listItem = document.createElement('ul');
  listItem.className= 'list-content';

  listItem.innerHTML = `<input type="checkbox" name="list">
    <li>${task}</li> <button class="delete"><i class="bx bx-trash"></i>Delete</button>`;

    // Handle delete
  listItem.querySelector('.delete').addEventListener('click', () => {
      listItem.classList.add('.fade-out');
      
      setTimeout(() => {
        listItem.remove();
        removeTask(task);

        if (listContainer.children.length === 0) {
          listContainer.style.display = 'none';
        }
      }, 300);
  });
              
  listContainer.prepend(listItem);
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(task) {
  let tasks = getTasks();
  tasks = tasks.filter(t => t !== task); // Remove matching task
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load all tasks on page load
function loadTasks() {
  const tasks = getTasks();
  if (tasks.length > 0) {
    listContainer.style.display = 'flex';
    tasks.forEach(task => addTask(task));
  }
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function displayMessage(text, type) {
  message.textContent = text;
  message.className = type;
  setTimeout(() => {
    message.textContent = '';
    message.classList.remove(type);
  }, 3000);
}
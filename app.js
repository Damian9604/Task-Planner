document.querySelector('.tasksList').addEventListener('click', deleteItem);
document.querySelector('form').addEventListener('submit', addTask);
document
  .querySelector('.options > select')
  .addEventListener('change', handleFilter);
let taskList = [];
class Item {
  constructor(taskName, checked, importance, date) {
    this.taskName = taskName;
    this.checked = checked;
    this.importance = importance;
    this.date = date;
  }
}
function addTask(event) {
  event.preventDefault();
  const value = document.querySelector('input#taskInput').value;
  const importance = document.querySelector('select').value;
  const date = document.querySelector('input[type=date]').value;
  const formattedDate = new Date(date).toLocaleDateString('pl-PL', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  taskList.push(new Item(value, false, importance, date));
  createElement(importance, value, formattedDate);
  document.querySelector('input#taskInput').value = '';
}
function createElement(importance, value, formattedDate) {
  const color = getColor(importance);
  document.querySelector('div.tasksList').innerHTML += `
  <div style='background-color:${color}' class="taskItem">
    <input type='checkbox' onclick="handleTaskDone(event)" class='isTaskDone'/>
    <span>${value}</span>
    <span> | ${formattedDate}</span>
    <button class="deleteBtn">x</button>
  </div>
`;
}
function getColor(importance) {
  switch (importance) {
    case 'high':
      return 'red';
    case 'medium':
      return 'yellow';
    case 'low':
      return 'green';
  }
}
function deleteItem(event) {
  if (event.target.className === 'deleteBtn') {
    document
      .querySelector('.tasksList')
      .removeChild(event.target.parentElement);
  }
}
function handleTaskDone(e) {
  if (e.target.checked) {
    document.querySelector('.tasksList').removeChild(e.target.parentElement);
    document.querySelector('.doneList').appendChild(e.target.parentElement);
  } else {
    document.querySelector('.doneList').removeChild(e.target.parentElement);
    document.querySelector('.tasksList').appendChild(e.target.parentElement);
  }
}
function handleFilter(event) {
  const filerValue = event.target.value;
  const filteredList = taskList.filter(
    (task) => task.importance === filerValue
  );
  document.querySelector('.tasksList').innerHTML = '';
  filteredList.forEach((task) =>
    createElement(task.importance, task.taskName, task.date)
  );
}
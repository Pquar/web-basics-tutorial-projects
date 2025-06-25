const form = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let tasks = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const task = taskInput.value.trim();
  if (task === '') {
    return;
  }

  tasks.push({
    id: Date.now(),
    task,
    completed: false
  });

  taskInput.value = '';
  updateTaskList();
});

taskList.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    const taskId = parseInt(event.target.dataset.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      updateTaskList();
    }
  }
});

function updateTaskList() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.classList.add(task.completed ? 'completed' : null);

    const text = document.createTextNode(task.task);
    li.appendChild(text);

    taskList.appendChild(li);
  });
}

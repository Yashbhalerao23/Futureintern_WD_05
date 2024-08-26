let tasks = [];
let pendingTasks = [];
let completedTasks = [];

document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    let taskInput = document.getElementById('task-input');
    let task = taskInput.value.trim();

    if (task) {
        let newTask = {
            text: task,
            completed: false,
            added: new Date().toLocaleString()
        };

        tasks.push(newTask);
        pendingTasks.push(newTask);
        taskInput.value = '';
        renderTasks();
    }
}

function renderTasks() {
    let pendingTasksElement = document.getElementById('pending-tasks');
    let completedTasksElement = document.getElementById('completed-tasks');

    pendingTasksElement.innerHTML = '';
    completedTasksElement.innerHTML = '';

    pendingTasks.forEach((task, index) => {
        let taskElement = document.createElement('li');
        taskElement.textContent = `${task.text} (Added: ${task.added})`;

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            deleteTask(index, pendingTasks);
        });

        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => {
            editTask(index, pendingTasks);
        });

        let completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.classList.add('complete-btn');
        completeBtn.addEventListener('click', () => {
            completeTask(index, pendingTasks);
        });

        taskElement.appendChild(deleteBtn);
        taskElement.appendChild(editBtn);
        taskElement.appendChild(completeBtn);

        pendingTasksElement.appendChild(taskElement);
    });

    completedTasks.forEach((task, index) => {
        let taskElement = document.createElement('li');
        taskElement.textContent = `${task.text} (Completed: ${task.completed})`;

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            deleteTask(index, completedTasks);
        });

        taskElement.appendChild(deleteBtn);
        completedTasksElement.appendChild(taskElement);
    });
}

function deleteTask(index, tasksArray) {
    tasksArray.splice(index, 1);
    renderTasks();
}

function editTask(index, tasksArray) {
    let task = tasksArray[index];
    let newTaskText = prompt('Enter new task text:', task.text);
    if (newTaskText) {
        task.text = newTaskText;
        renderTasks();
    }
}

function completeTask(index, tasksArray) {
    let task = tasksArray[index];
    task.completed = new Date().toLocaleString(); // Set completion date
    completedTasks.push(task);
    tasksArray.splice(index, 1);
    renderTasks();
}

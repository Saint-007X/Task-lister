
const taskInput = document.getElementById('task-input');
const categorySelect = document.getElementById('category-select');
const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task-btn');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

// Add task event
addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    const category = categorySelect.value;

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        text: taskText,
        category: category,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = ''; // Clear input
});

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `${task.text} (${task.category})`;
        if (task.completed) {
            li.classList.add('completed');
        }

        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.addEventListener('click', () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            taskInput.value = task.text;
            categorySelect.value = task.category;
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(completeBtn);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

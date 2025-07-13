const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
let tasks = [];

document.addEventListener('DOMContentLoaded', function() {
    loadTasksFromStorage();
    renderTasks(); 
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    };
    tasks.unshift(newTask); 
    taskInput.value = '';
    saveTasksToStorage();
    renderTasks();
    taskInput.focus();
}
// Render all tasks
function renderTasks() {
    taskList.innerHTML = '';
    if (tasks.length === 0) {
        emptyState.classList.add('show');
        return;
    } else {
        emptyState.classList.remove('show');
    }
    tasks.forEach((task, index) => {
        const taskItem = createTaskElement(task, index);
        taskList.appendChild(taskItem);
    });
}
// Create individual task element
function createTaskElement(task, index) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.setAttribute('data-task-id', task.id);
    li.innerHTML = `
        <label class="task-checkbox">
            <input type="checkbox" ${task.completed ? 'checked' : ''} 
                   onchange="toggleTask(${task.id})">
            <span class="checkmark"></span>
        </label>
        <span class="task-text ${task.completed ? 'completed' : ''}">${escapeHtml(task.text)}</span>
        <button class="remove-btn" onclick="removeTask(${task.id})" title="Remove task">
            ❌
        </button>
    `;
    return li;
}
function removeTask(taskId) {
    // Optional: Add confirmation for important tasks
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
        const confirmDelete = confirm(`Are you sure you want to delete "${task.text}"?`);
        if (!confirmDelete) return;
    }
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasksToStorage();
    renderTasks();
}
// Save tasks to localStorage
function saveTasksToStorage() {
    try {
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
        alert('Unable to save tasks. Your browser may have storage limitations.');
    }
}
// Load tasks from localStorage
function loadTasksFromStorage() {
    try {
        const storedTasks = localStorage.getItem('todoTasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            
            tasks = tasks.filter(task => 
                task && 
                typeof task.id !== 'undefined' && 
                typeof task.text === 'string' && 
                typeof task.completed === 'boolean'
            );
        }
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        tasks = [];
    }
}
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

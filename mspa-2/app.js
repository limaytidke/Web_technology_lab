let tasks = JSON.parse(localStorage.getItem('student_tasks')) || [];
let currentFilter = 'all';
let searchQuery = '';

const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskDescInput = document.getElementById('task-desc');
const taskDateInput = document.getElementById('task-date');
const taskPriorityInput = document.getElementById('task-priority');
const taskListContainer = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');
const filterTabs = document.querySelectorAll('.tab-btn');

const statTotal = document.getElementById('stat-total');
const statPending = document.getElementById('stat-pending');
const statCompleted = document.getElementById('stat-completed');

function saveTasks() {
    localStorage.setItem('student_tasks', JSON.stringify(tasks));
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    statTotal.textContent = total;
    statPending.textContent = pending;
    statCompleted.textContent = completed;
}

function checkDueDate(dateString) {
    if (!dateString) return { text: '', isOverdue: false };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateString);
    dueDate.setHours(0, 0, 0, 0);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let text = `Due: ${dateString}`;
    let isOverdue = false;
    if (diffDays < 0) {
        text = `Overdue by ${Math.abs(diffDays)} day(s)`;
        isOverdue = true;
    } else if (diffDays === 0) {
        text = `Due Today!`;
        isOverdue = true;
    } else if (diffDays === 1) {
        text = `Due Tomorrow`;
    }

    return { text, isOverdue };
}

function renderTasks() {
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        if (currentFilter === 'pending') return matchesSearch && !task.completed;
        if (currentFilter === 'completed') return matchesSearch && task.completed;
        return matchesSearch;
    });

    if (filteredTasks.length === 0) {
        taskListContainer.innerHTML = `
                    <div class="empty-state">
                        <span>📝</span>
                        <p>No tasks found. Time to relax or add a new assignment!</p>
                    </div>
                `;
        updateStats();
        return;
    }

    taskListContainer.innerHTML = filteredTasks.map(task => {
        const dueInfo = checkDueDate(task.dueDate);
        const priorityClass = `badge-${task.priority.toLowerCase()}`;

        return `
                    <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
                        <div class="task-content">
                            <div class="task-header-row">
                                <span class="task-title">${escapeHTML(task.title)}</span>
                                <span class="badge ${priorityClass}">${task.priority}</span>
                            </div>
                            ${task.desc ? `<div class="task-desc">${escapeHTML(task.desc)}</div>` : ''}
                            <div class="task-footer">
                                ${task.dueDate ? `
                                    <div class="task-due ${dueInfo.isOverdue && !task.completed ? 'overdue' : ''}">
                                        📅 ${dueInfo.text}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                        <button class="btn-icon" onclick="deleteTask(${task.id})" title="Delete Task">
                            🗑️
                        </button>
                    </div>
                `;
    }).join('');

    updateStats();
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = taskTitleInput.value.trim();
    const desc = taskDescInput.value.trim();
    const dueDate = taskDateInput.value;
    const priority = taskPriorityInput.value;

    if (!title) return;

    const newTask = {
        id: Date.now(),
        title,
        desc,
        dueDate,
        priority,
        completed: false
    };

    tasks.unshift(newTask); 
    saveTasks();
    renderTasks();

    taskForm.reset();
    taskPriorityInput.value = 'Medium'; 
});

window.toggleTask = function(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks();
    renderTasks();
};

window.deleteTask = function(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
};

searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderTasks();
});

filterTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        filterTabs.forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.getAttribute('data-filter');
        renderTasks();
    });
});

renderTasks();

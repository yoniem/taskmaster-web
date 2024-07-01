document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', addTask);

    function addTask(e) {
        e.preventDefault();

        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please add a task');
            return;
        }

        const li = document.createElement('li');
        li.appendChild(document.createTextNode(taskText));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.appendChild(document.createElement('i')).className = 'fas fa-trash';
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
        taskInput.value = '';

        saveTasks();
    }

    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('fa-trash')) {
            e.target.parentElement.parentElement.remove();
        } else {
            e.target.classList.toggle('completed');
        }

        saveTasks();
    });

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(function(task) {
            tasks.push({
                text: task.firstChild.textContent,
                completed: task.classList.contains('completed')
            });
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function(task) {
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(task.text));
            if (task.completed) {
                li.classList.add('completed');
            }

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete';
            deleteBtn.appendChild(document.createElement('i')).className = 'fas fa-trash';
            li.appendChild(deleteBtn);

            taskList.appendChild(li);
        });
    }

    loadTasks();
});
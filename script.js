document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const taskDate = document.getElementById('task-date');
    const taskTime = document.getElementById('task-time');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    let editMode = false;
    let editTaskElement = null;

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const date = taskDate.value;
        const time = taskTime.value;
        
        if (taskText === '') {
            return;
        }

        if (editMode) {
            editTaskElement.querySelector('.task-details span').textContent = taskText;
            editTaskElement.querySelector('.task-time-date').textContent = formatDateTime(date, time);
            resetInputFields();
            editMode = false;
            editTaskElement = null;
        } else {
            addTask(taskText, date, time);
        }
    });

    function addTask(text, date, time) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        const taskDetails = document.createElement('div');
        taskDetails.classList.add('task-details');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = text;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => {
            taskInput.value = text;
            taskDate.value = date;
            taskTime.value = time;
            editMode = true;
            editTaskElement = taskItem;
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
        });

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.classList.add('complete-button');
        completeButton.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
        });

        taskDetails.appendChild(taskSpan);
        taskDetails.appendChild(editButton);
        taskDetails.appendChild(deleteButton);
        taskDetails.appendChild(completeButton);

        const taskTimeDate = document.createElement('div');
        taskTimeDate.classList.add('task-time-date');
        taskTimeDate.textContent = formatDateTime(date, time);

        taskItem.appendChild(taskDetails);
        taskItem.appendChild(taskTimeDate);

        taskList.appendChild(taskItem);
        resetInputFields();
    }

    function resetInputFields() {
        taskInput.value = '';
        taskDate.value = '';
        taskTime.value = '';
    }

    function formatDateTime(date, time) {
        if (date && time) {
            return `${date} ${time}`;
        } else if (date) {
            return date;
        } else if (time) {
            return time;
        } else {
            return '';
        }
    }
});

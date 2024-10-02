const TaskInput = document.getElementById('add-task-input');
const addButton = document.getElementById('add');
const container = document.getElementById('tasks-container');
const checkAll = document.getElementById('check-all-button');
const deleteAll = document.getElementById('delete-all-button');

// Add Task
const addNewTask = () => {
    const taskContent = TaskInput.value.trim();
    TaskInput.value = '';

    if (taskContent) {
        const newTask = document.createElement('div');
        newTask.classList.add('task-container');

        const box1 = document.createElement('div');
        box1.classList.add('box1');

        const box2 = document.createElement('div');
        box2.classList.add('box2');

        const task = document.createElement('p');
        task.classList.add('task');
        task.textContent = taskContent;

        // Check Button
        const checkTask = document.createElement('input');
        checkTask.type = 'checkbox';
        checkTask.classList.add('check-button');
        checkTask.addEventListener('change', () => {
            task.classList.toggle('completed');
        });

        // Edit Button
        const editTaskButton = document.createElement('button');
        editTaskButton.classList.add('edit-button', 'button');

        editTaskButton.addEventListener('click', () => {
            task.style.display = 'none';
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.classList.add('edit-input');
            editInput.value = taskContent;

            const updateButton = document.createElement('button');
            updateButton.classList.add('update-button', 'button');
            const updateIcon = document.createElement('i');
            updateIcon.classList.add('fa-solid', 'fa-check');
            updateButton.appendChild(updateIcon);

            updateButton.addEventListener('click', () => {
                const updatedTask = editInput.value.trim();
                if (updatedTask) {
                    task.textContent = updatedTask;
                }

                task.style.display = 'block';
                box1.removeChild(editInput);
                box2.replaceChild(editTaskButton, updateButton);
            });

            box2.replaceChild(updateButton, editTaskButton);
            box1.appendChild(editInput);
        });

        const editIcon = document.createElement('i');
        editIcon.classList.add('fa-solid', 'fa-pen-to-square');
        editTaskButton.appendChild(editIcon);

        // Delete Button
        const deleteTaskButton = document.createElement('button');
        deleteTaskButton.classList.add('delete-button', 'button');
        deleteTaskButton.addEventListener('click', () => {
            container.removeChild(newTask);
        });

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-solid', 'fa-trash');
        deleteTaskButton.appendChild(deleteIcon);

        box2.append(checkTask, editTaskButton, deleteTaskButton);
        box1.appendChild(task);

        newTask.append(box1, box2);
        container.appendChild(newTask);
    }
};

// Check All
checkAll.addEventListener('click', () => {
    const allCheckBox = document.querySelectorAll('.check-button');
    const allChecked = Array.from(allCheckBox).every(checkbox => checkbox.checked);
    allCheckBox.forEach((checkbox) => {
        checkbox.checked = !allChecked;
        const taskText = checkbox.parentElement.previousElementSibling.querySelector('.task');
        if (checkbox.checked) {
            taskText.classList.add('completed');
        } else {
            taskText.classList.remove('completed');
        }
    });
});

// Delete All
deleteAll.addEventListener('click', () => {
    container.innerHTML = '';
});

addButton.addEventListener('click', addNewTask);

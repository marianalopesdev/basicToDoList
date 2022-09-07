const addTasks = document.querySelector('.add-tasks');
const taskList = document.querySelector('.taskList');
const updateInput = document.getElementsByName("updateInput");
const updateButton = document.getElementsByName("updateButton");
const deleteButton = document.getElementsByName("deleteButton");
const editButton = document.getElementsByName("editButton");

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

populateTaskList(tasks, taskList);

addTasks.addEventListener('submit', addNewTask);
taskList.addEventListener('change', toggleDone);

function addNewTask(e) {
    e.preventDefault();
    const taskTitle = (document.querySelector('[name=taskTitle')).value;
    const task = {
        taskTitle,
        status: false
    };
    tasks.push(task);
    populateTaskList(tasks, taskList);
    saveOnLocalStorage();
    this.reset();
}

function populateTaskList(tasks = [], taskList) {
    taskList.innerHTML = tasks.map((task, i) => {
        return `
            <li>
            <input type="checkbox" data-index=${i} id="task${i}" ${task.status ? 'checked' : ''} />
            <label for="task${i}" contentEditable="false">${task.taskTitle}</label>   
            <button type="button" data-index=${i} name="editButton"  onclick="editTask(this)">edit</button>     
            <button type="button" data-index=${i} name="deleteButton" onclick="deleteTask(this)">
            X</button>
            <input type="text" id="updateTask" name="updateInput" class="hideElement" required>
            <button type="button" data-index=${i} name="updateButton" class="hideElement" onclick="saveTask(this)" >V</button>
            `;
    }).join('');
}

function deleteTask(e) {
    const taskIndex = e.dataset.index;
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
    }
    saveOnLocalStorage();
}

function toggleDone(e) {
    if (!e.target.matches('input')) return;
    const targetClick = e.target;
    const taskIndex = targetClick.dataset.index;
    tasks[taskIndex].status = !tasks[taskIndex].status;
    saveOnLocalStorage();
}

function toggleAllTasks(source) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] != source) {
            checkboxes[i].checked = source.checked;
            tasks[i].status = source.checked;
        }
        saveOnLocalStorage();
    }
}

function saveOnLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    populateTaskList(tasks, taskList);
}

function saveTask(e) {
    const taskIndex = e.dataset.index;    
    // console.log(updateInput[taskIndex].value);
    if (updateInput[taskIndex].value == "") {
        tasks[taskIndex].taskTitle = tasks[taskIndex].taskTitle;
    }
    else {
        tasks[taskIndex].taskTitle = updateInput[taskIndex].value;
    }
    saveOnLocalStorage();
}

function editTask(e) {
    const taskIndex = e.dataset.index;   

    updateInput[taskIndex].classList.remove("hideElement");   
    updateButton[taskIndex].classList.remove("hideElement");    
    deleteButton[taskIndex].classList.add("hideElement");
    editButton[taskIndex].classList.add("hideElement");

    const currentTaskTitle = tasks[taskIndex].taskTitle;
    updateInput[taskIndex].value = currentTaskTitle;
}
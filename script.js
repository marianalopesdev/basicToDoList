const addTasks = document.querySelector('.add-tasks');
const taskList = document.querySelector('.taskList');
// const markAllTasks = document.querySelector('.markAll');
// const unmarkAllTasks = document.querySelector('.unmarkAll');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addNewTask(e) {
    e.preventDefault();
    const taskTitle = (document.querySelector('[name=taskTitle')).value;
    const task = {
        taskTitle,
        status: false
    };
    tasks.push(task);
    populateList(tasks, taskList);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.reset();;
}

function populateList(tasks = [], taskList) {
    taskList.innerHTML = tasks.map((task, i) => {
        return `
    <li>
      <input type="checkbox" name="check" data-index=${i} id="task${i}" ${task.status ? 'checked' : ''} />
      <label for="task${i}">${task.taskTitle}</label>
      <label for="task${i}">${task.status}</label>     
      <a href="" onclick="pup(e)" data-index=${i} id="task${i}">edit</a>     
    
     <div id="lines"></div>
     <button type="button" onclick="addInput('lines')">+</button>
    `;
    }).join('');
}

function toggleDone(e) {

    if (!e.target.matches('input')) return;
    const targetClick = e.target;
    const taskIndex = targetClick.dataset.index;
    tasks[taskIndex].status = !tasks[taskIndex].status;
    saveOnLocalStorage();
}

function toggle(source) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] != source)
            {
                checkboxes[i].checked = source.checked;
                tasks[i].status = source.checked;
            }
        saveOnLocalStorage();
    }
}

function saveOnLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    populateList(tasks, taskList);
}

populateList(tasks, taskList);

addTasks.addEventListener('submit', addNewTask);
taskList.addEventListener('click', toggleDone);
taskList.addEventListener('click', pup);
// markAllTasks.addEventListener('click', markAll);
// unmarkAllTasks.addEventListener('click', unmarkAll);

function pup(e) {
    console.log('pup');
    const targetClick = e.target;
    const taskIndex = targetClick.dataset.index;
    tasks[taskIndex].status = !tasks[taskIndex].status;
    var elemento = document.getElementById("task1${i}");
    elemento.dis
    

    saveOnLocalStorage();
    populateList(tasks, taskList);

}


var formLine = 1;
function addInput(divName) {
	var newdiv = document.createElement('div');
	newdiv.innerHTML  = '['+formLine+']';
	newdiv.innerHTML += '<input type="text" id="task${i}" class="bubu" placeholder="Insert k" required>';
	
	document.getElementById(divName).appendChild(newdiv);
	formLine++;
}

addInput('lines');

const addTasks = document.querySelector('.add-tasks');
const taskList = document.querySelector('.taskList');
const markAllTasks = document.querySelector('.markAll');
const unmarkAllTasks = document.querySelector('.unmarkAll');
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
    </li>



    `;
    }).join('');
}

function toggleDone(e) {

    if (!e.target.matches('input')) return;
    const targetClick = e.target;
    const taskIndex = targetClick.dataset.index;
    tasks[taskIndex].status = !tasks[taskIndex].status;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    populateList(tasks, taskList);
}

function toggle(source)    
 {
   // console.log('click');

     var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // console.log(checkboxes);
    for (var i = 0; i < checkboxes.length; i++) {
       if (checkboxes[i] != source)
            checkboxes[i].checked = source.checked;
            tasks[i].status = !tasks[i].status;
            
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    populateList(tasks, taskList);

    
populateList(tasks, taskList);

addTasks.addEventListener('submit', addNewTask);
taskList.addEventListener('click', toggleDone);
markAllTasks.addEventListener('click', markAll);
unmarkAllTasks.addEventListener('click', unmarkAll);
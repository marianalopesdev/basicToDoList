const addTasks = document.querySelector('.add-tasks');
const taskList = document.querySelector('.taskList');
const markAllTasks = document.querySelector('.markAllTasks');
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

function markAll(e)    
 {
    console.log(e)

//     var checkboxes = document.querySelectorAll('input[type="checkbox"]');
//     for (var i = 0; i < checkboxes.length; i++) {
//         if (checkboxes[i] != false)
//             checkboxes[i].checked = true;
//     }
//     // if (tasks[0].status != true){
//     //     tasks[0].status ==true;
//     // }
// //     console.log(tasks.status);
// //     const status = (document.querySelector('[name=check')).value;
// //     console.log(status);
// // //tasks.status = false;
// localStorage.setItem('tasks', JSON.stringify(tasks));
// populateList(tasks, taskList);
}

populateList(tasks, taskList);

addTasks.addEventListener('submit', addNewTask);
taskList.addEventListener('click', toggleDone);
markAllTasks.addEventListener('click', markAll);
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
    this.reset();
}

function populateList(tasks = [], taskList) {
    taskList.innerHTML = tasks.map((task, i) => {
        return `
    <li>
      <input type="checkbox" data-index=${i} id="task${i}" ${task.status ? 'checked' : ''} />
      <label for="task${i}" contentEditable="false">${task.taskTitle}</label>
    
      
     
     
    
     <div id="lines"></div>
     <button type="button" data-index=${i} onclick="eTa(this)" >otrodit</button>
     
     <button type="button" data-index=${i} onclick="deleteTask(this)" name="zz" class="pipi">X</button>
     <input type="text" class="xuxu" name="cucu" required>
     <button type="button" data-index=${i} onclick="saveTask(this)" class="btnEdit" name="pupu">V</button>
    `;
    }).join('');
}
//<button type="button" onclick="addInput('lines')">+</button>  <button type="button"onclick="pup(this)" data-index=${i} id="task${i}">edit</button> 
//  <label for="task${i}" >${task.status} </label>    <label id="tt${i}" contentEditable="false" data-index=${i}>${task.taskTitle}</label> 
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

function toggle(source) {
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
    populateList(tasks, taskList);
}

populateList(tasks, taskList);

addTasks.addEventListener('submit', addNewTask);
taskList.addEventListener('change', toggleDone);
//taskList.addEventListener('change', pup);
// markAllTasks.addEventListener('click', markAll);
// unmarkAllTasks.addEventListener('click', unmarkAll);



function pup(e) {

    console.log('pup');

    const taskIndex = e.dataset.index;
    const lolo = document.getElementById("tt" + taskIndex);
    lolo.contentEditable = "true";

    console.log(lolo);

}

function saveTask(e) {


    //save pro content editable do label
    // const taskIndex = e.dataset.index;

    //   const lolo = document.getElementById("tt"+taskIndex);

    //   tasks[taskIndex].taskTitle = lolo.innerHTML;


    const taskIndex = e.dataset.index;
    const vv = document.getElementsByName("cucu");
    console.log(vv[taskIndex].value);
    if (vv[taskIndex].value == "") {
        tasks[taskIndex].taskTitle = tasks[taskIndex].taskTitle;
    }
    else {
        tasks[taskIndex].taskTitle = vv[taskIndex].value;
    }
    saveOnLocalStorage();



}

function eTa(e) {
    const taskIndex = e.dataset.index;
    const vv = document.getElementsByName("cucu");
    const xx = document.getElementsByName("pupu");
    const zz = document.getElementsByName("zz");
   
    vv[taskIndex].classList.remove("xuxu");
    xx[taskIndex].classList.remove("btnEdit");
    zz[taskIndex].classList.remove("pipi");
    zz[taskIndex].classList.add("pipo");

    const nn = tasks[taskIndex].taskTitle;
    console.log(nn);
    vv[taskIndex].value = nn;

}



// var formLine = 1;
// function addInput(divName) {
//     console.log('enetr');

//     const vv = document.getElementsByName("cucu");
//     vv[taskIndex].classList.remove("xuxu");

//     // var newdiv = document.createElement('div');
//     // newdiv.innerHTML  = '['+formLine+']';
//     // newdiv.innerHTML = '<input type="text" name="cucu" placeholder="Insert add ssssinput" class="taskListV"i required>';

//     // // var y = taskList.getElementsByName("xuxu");

//     // // console.log(y);
//     // // y.classList.add("taskListV"); 
//     // document.getElementById(divName).appendChild(newdiv);
//     // formLine++;
// }

// addInput('lines');

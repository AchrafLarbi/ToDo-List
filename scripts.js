
var confirmButton = document.getElementById("confirmButton");

var input = document.getElementById('input-add')


var modal = document.getElementById("addWindow");


var modal = document.getElementById("addWindow");

var btn = document.getElementById("add");


var close = document.getElementsByClassName("close")[0];


close.onclick = function() {
    modal.style.display = "none";
}


window.onclick = event => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



var tasksarr = []


function addTasks(tasks) {


    const taskContainer = document.getElementById('tasks');
    taskContainer.innerHTML = ""

    tasks.forEach((task,index) => {
        const taskDiv = document.createElement('div');
        if (task.isDone) {
            taskDiv.className ='task task2'
        }else {
            taskDiv.className = 'task';
        }
        

        const title = document.createElement('h1');
        title.style.fontWeight = '400';
        title.innerText = task.title;
        taskDiv.appendChild(title);

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'buttons';

        const editButton = document.createElement('button');
        editButton.className = 'btn';
        editButton.id = 'edit-btn';
        editButton.style.backgroundColor = 'rgba(0, 151, 216, 0.5)';
        editButton.innerHTML = '<span class="material-symbols-outlined">edit</span>';
        editButton.onclick = function () {
            editTask(index);
        }
        buttonsDiv.appendChild(editButton);

        const checkButton = document.createElement('button');
        checkButton.className = 'btn';
        checkButton.id = 'check-btn';
        checkButton.style.backgroundColor = task.isDone? 'rgba(11, 0, 216, 0.5) ' :'rgba(0, 216, 54, 0.5)';
        checkButton.innerHTML = task.isDone? '<span class="material-symbols-outlined">cancel</span>' : '<span class="material-symbols-outlined">check</span>';
        checkButton.onclick = function() {
            changeTask(index);
        };
        buttonsDiv.appendChild(checkButton);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn';
        deleteButton.id = 'delete-btn';
        deleteButton.style.backgroundColor = 'rgba(216, 0, 0, 0.5)';
        deleteButton.innerHTML = '<span class="material-symbols-outlined">delete</span>';
        deleteButton.onclick = function() {
            removeTask(index);
        };
        buttonsDiv.appendChild(deleteButton);

        taskDiv.appendChild(buttonsDiv);



        const dateDiv = document.createElement('div');
        dateDiv.className = 'date';

        const calendarIcon = document.createElement('span');
        calendarIcon.className = 'material-symbols-outlined';
        calendarIcon.innerText = 'calendar_month';
        dateDiv.appendChild(calendarIcon);

        const datePara = document.createElement('p');
        datePara.id = 'date-para';
        datePara.innerText = task.date;
        dateDiv.appendChild(datePara);

        taskDiv.appendChild(dateDiv);

 

        taskContainer.appendChild(taskDiv);
    });
}

function getTaskByStorage() {
    let tasksarrjson = JSON.parse(localStorage.getItem("array"))
    tasksarr = tasksarrjson ?? []
}

getTaskByStorage();

addTasks(tasksarr);

let date = new Date
let datetime = date.getDate() +"/"+(date.getMonth()+1)+"/"+date.getFullYear()


btn.onclick = function() {

    confirmButton.onclick = function() {
        var value = input.value
    
        tasksarr.push({
            "title":value,
            "date":datetime,
            "isDone":false
        })

        let jsonarr = JSON.stringify(tasksarr)
        localStorage.setItem("array",jsonarr) 
        addTasks(tasksarr);
        modal.style.display = "none";
    }
    modal.style.display = "block";
}



function removeTask(index) {
    if(confirm('are you sure you want to delete this ')){
        tasksarr.splice(index,1)
        let jsonarr = JSON.stringify(tasksarr)
        localStorage.setItem("array",jsonarr) 
        addTasks(tasksarr);
    }

}

function editTask(index) {
    input.value = tasksarr[index].title ;
    modal.style.display = "block";
  
    confirmButton.onclick = function() {
        tasksarr[index].title = input.value;
        let jsonarr = JSON.stringify(tasksarr)
        localStorage.setItem("array",jsonarr) 
        addTasks(tasksarr);
        modal.style.display = 'none';
    }
}

function changeTask(index) {
    console.log(tasksarr[index].isDone)
    tasksarr[index].isDone = !tasksarr[index].isDone
    let jsonarr = JSON.stringify(tasksarr)
    localStorage.setItem("array",jsonarr) 
    addTasks(tasksarr);
}
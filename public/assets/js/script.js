"use strict"
let btnAddEl = document.getElementById('btnAdd')
let taskList = document.getElementById('list')
let taskEl = document.getElementById('task')
let todolist = []
let btnResetEl = document.getElementById('btnReset')
let btnFinishEl = document.getElementById('btnFinish')


/*Fonction intermediare */
// Ajout du code dans le HTML.
const updateDom = () => {
    let taskText = taskEl.value
    let listItem = document.createElement("li")
    listItem.classList.add('d-flex')
    listItem.id = Date.now()
    listItem.innerHTML = `<div class="textTask form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
    <input type='text' placeholder=${taskText}></div>
    <div class= "editDeleteBtn" </button><button class= 'btnTrashLi' type=button><i class="bi bi-trash"></i></button></div>`;
    taskList.appendChild(listItem)
    const checkbox = listItem.querySelector('.form-check-input');
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            moveToCompletedTasks(listItem);
        } else {
            moveBackToTaskList(listItem);
        }
    });
    return listItem.id

}
// sauvegarde
const saveTask = (listItemId) => {
    let taskElValue = listItemId + ' ' + taskEl.value
    todolist.push(taskElValue)
    let todolistStringify = JSON.stringify(todolist)
    localStorage.setItem('todolist', todolistStringify)
    // console.log(elementstringify);

}

const clearStorage = () => {
    localStorage.removeItem('todolist')
    taskList.innerHTML = '';
    CompletedTaskList.innerHTML = '';
}

/* fonction principale */
const addTask = () => {
    if (taskEl.value === "") {
        alert("Ajoutez une tâche s'il vous plaît !")
        return false;
    }
    let listItemId = updateDom()
    saveTask(listItemId)
    taskEl.value = ''
}
const editTask = (listItem) => {
}
const deleteTask = (listItem) => {


}
// Fonction de restauration du local storage.
const restoreTask = () => {
    if (localStorage.getItem('todolist')) {
        todolist = JSON.parse(localStorage.getItem('todolist'));

        todolist.forEach((taskItem) => {
            const [listItemId, taskText] = taskItem.split(' ');
            const listItem = document.createElement('li');
            listItem.classList.add('d-flex');
            listItem.id = listItemId;
            listItem.innerHTML = `
                <div class="textTask form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                    <input type='text' placeholder=${taskText}>
                </div>
                <div class="editDeleteBtn">
                    <button class="btnTrashLi" type="button"><i class="bi bi-trash"></i></button>
                </div>`;
            taskList.appendChild(listItem);

            const checkbox = listItem.querySelector('.form-check-input');
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    moveToCompletedTasks(listItem);
                }
                else {
                    moveBackToTaskList(listItem);
                }
            });

            listItem.addEventListener('click', editTask)
            listItem.addEventListener('click', deleteTask)
        });
    }
};

const moveToCompletedTasks = (listItem) => {
    const completedTaskList = document.getElementById('CompletedTaskList');
    listItem.style.textDecoration = "line-through"
    completedTaskList.appendChild(listItem);
};
const moveBackToTaskList = (listItem) => {
    const taskList = document.getElementById('list');
    listItem.style.textDecoration = "none"
    taskList.appendChild(listItem);
};

// Suppression du local storagec
const deleteAllTask = () => {
    clearStorage()
}
// Suppresion d'une tâche 

// listItem.addEventListener('click' removeTask )

/* ecouteur d'evenement */
btnAddEl.addEventListener('click', addTask)
btnResetEl.addEventListener('click', deleteAllTask)
window.addEventListener('load', restoreTask)

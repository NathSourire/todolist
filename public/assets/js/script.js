"use strict"
let btnAddEl = document.getElementById('btnAdd')
let taskList = document.getElementById('list')
let taskEl = document.getElementById('task')
let todolist = []
let btnResetEl = document.getElementById('btnReset')


/*Fonction intermediare */
const updateDom = () => {
    let taskInputText = taskEl.value
    let listItem = document.createElement("li")
    listItem.classList.add('d-flex')
    listItem.innerHTML = `<div class="textTask form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">${taskInputText}</div>
    <div class="editDeleteBtn "><button class = "btnPencilLi" type=button><i class="bi bi-pencil"></i></button><button class= 'btnTrashLi' type=button><i class="bi bi-trash"></i></button></div>`;
    listItem.id = Date.now()
    taskList.appendChild(listItem)
    return listItem.id

}
// sauvegarde
const saveTask = (listItemId) => {
    let taskElValue = listItemId + ' ' + taskEl.value
    todolist.push(taskElValue)
    let todolistStringify = JSON.stringify(todolist)
    localStorage.setItem('id, todolist', todolistStringify)
    // console.log(elementstringify);  
}


// const deleteTask = () => {
//     spanItemTrash.id.removeItem('listItem')
// }

const clearStorage = () => {
    localStorage.removeItem('todolist')
    taskList.innerHTML = ''
}

/* fonction principale */
const addTask = () => {
    let listItemId = updateDom()
    saveTask(listItemId)
    taskEl.value = ''
}
const restoreTask = () => {
    if (localStorage.getItem('todolist')) {
        todolist = JSON.parse(localStorage.getItem('todolist'))
    }
}
const deleteAllTask = () => {
    clearStorage()
}

const editTask = () => {
    let newInputTask = document.createElement('input')
    newInputTask.type = 'text';
    newInputTask.name= 'nouveauInput';
    newInputTask.placeholder ="Saisir une nouvelle tâche";
}

/* ecouteur d'evenement */
btnAddEl.addEventListener('click', addTask)
btnResetEl.addEventListener('click', deleteAllTask)
// btnTrashLi.addEventListener('click', deleteTask)
window.addEventListener('load', restoreTask)



